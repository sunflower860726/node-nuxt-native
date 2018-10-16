// src/services/patient/hooks/restrict-to-hcp.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const errors = require('feathers-errors');
const isPlainObject = require('lodash.isplainobject');
const get = require('lodash.get');

const defaults = {
  idField: '_id',
  ownerField: 'userId'
};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    if (hook.type !== 'before') {
      throw new Error(
        'The "restrictToAssigned" hook should only be used as a "before" hook.'
      );
    }

    // If it was an internal call then skip this hook
    if (!hook.params.provider) {
      return hook;
    }

    if (!(hook.method === 'find' || hook.method === 'get')) {
      throw new errors.MethodNotAllowed(
        'The "restrictToAssigned" hook should only be used on the "find" and "get" service methods.'
      );
    }

    if (!hook.params.user) {
      throw new errors.NotAuthenticated(
        'The current user is missing. You must not be authenticated.'
      );
    }

    // Set provider as undefined so we avoid an infinite loop if this hook is
    // set on the resource we are requesting.
    const params = Object.assign({}, hook.params, { provider: undefined });
    const Hcp = hook.app.service('api/hcps');

    if (hook.method === 'find') {
      // The authenticated user
      const user = hook.params.user;

      // Get the hcp associated to this user.
      return Hcp.find({
        query: {
          userId: user._id
        }
      }).then(result => {
        const hcps = result;
        if (hcps && hcps.length > 0) {
          const hcp = hcps[0];
          hook.params.query = Object.assign(hook.params.query, {
            _id: {
              $in: hcp.patients
            }
          });
          return hook;
        } else {
          throw new errors.MethodNotAllowed('User not HCP');
        }
      });
    } else {
      const id = get(hook.params.user, options.idField);

      if (id === undefined) {
        throw new Error(`${options.idField} is missing from current user.`);
      }

      // Gets the Patient record
      return this.get(hook.id, params).then(data => {
        if (data.toJSON) {
          data = data.toJSON();
        } else if (data.toObject) {
          data = data.toObject();
        }

        if (!data.generalConsent) {
          throw new errors.Forbidden(
            'You do not have the permissions to access this.'
          );
        }

        let field = data[options.ownerField];

        // Handle nested Sequelize or Mongoose models
        if (isPlainObject(field)) {
          field = field[options.idField];
        }

        if (Array.isArray(field)) {
          const fieldArray = field.map(idValue => idValue.toString());
          if (
            fieldArray.length === 0 ||
            fieldArray.indexOf(id.toString()) < 0
          ) {
            throw new errors.Forbidden(
              'You do not have the permissions to access this.'
            );
          } else {
            return hook;
          }
        } else if (field === undefined) {
          throw new errors.Forbidden(
            'You do not have the permissions to access this.'
          );
        } else {
          if (field.toString() === id.toString()) {
            // current user is the patient, return the result
            return hook;
          }
          // User is not a patient or not the patient requested so check if user is an hcp
          // and is an authorized hcp for this patient
          return Hcp.find({
            query: {
              userId: id
            }
          }).then(hcps => {
            if (hcps.length === 1) {
              const hcp = hcps[0];
              if (hcp.patients.indexOf(data._id) < 0) {
                throw new errors.Forbidden(
                  'You do not have the permissions to access this.'
                );
              }
              return hook;
            } else {
              throw new errors.Forbidden(
                'You do not have the permissions to access this.'
              );
            }
          });
        }
      });
    }
  };
};
