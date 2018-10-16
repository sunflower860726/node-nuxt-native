// src/services/patient/hooks/restrict-to-hcp.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const errors = require('feathers-errors');

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

    if (!hook.params.user || hook.params.user._id === undefined) {
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
          hook.params = params;
          return hook;
        } else {
          throw new errors.MethodNotAllowed('User not HCP');
        }
      });
    } else {
      return hook;
    }
  };
};
