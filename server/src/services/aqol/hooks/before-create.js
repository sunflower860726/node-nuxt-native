// src/services/event/hooks/create.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const uuid = require('uuid');
const errors = require('feathers-errors');

const defaults = {};

/* eslint-disable no-unused-vars */
module.exports = function(options) {
  // eslint-disable-line no-unused-vars
  options = Object.assign({}, defaults, options);

  return function(hook) {
    // Validations for minimum values
    var errorMessages = [];
    if (!hook.data.date) {
      errorMessages.push({
        path: 'date',
        value: hook.data.date,
        message: 'AQOL result must have a date'
      });
    }

    // Validations for existing data
    const AQOL = hook.app.service('api/aqol');
    return AQOL.find({
      query: {
        userId: hook.data.userId,
        date: hook.data.date
      }
    }).then(aqolResult => {
      if (aqolResult && aqolResult.length > 0) {
        errorMessages.push({
          path: 'date',
          value: hook.data.date,
          message: 'AQOL result already submitted for this date'
        });
      }

      // Generate the _id if it was not submitted
      // This is a good idea so we can populate the stream with the
      // correct _id
      if (!hook.data._id) {
        hook.data._id = uuid.v4();
      }

      if (errorMessages.length > 0) {
        throw new errors.BadRequest('Invalid Request', {
          errors: errorMessages
        });
      }

      const Patient = hook.app.service('api/patients');
      return Patient.find({
        query: {
          userId: hook.data.userId
        }
      }).then(patients => {
        var patient = patients[0];
        hook.data.patientId = patient._id;

        var now = new Date();
        hook.data.createdAt = now;
        hook.data.updatedAt = now;

        return hook;
      });
    });
  };
};
