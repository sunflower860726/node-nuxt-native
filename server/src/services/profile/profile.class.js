/* eslint-disable no-unused-vars */

const errors = require('feathers-errors');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  find(params) {
    if (!params.user) {
      throw new errors.NotAuthenticated(
        'The current user is missing. You must not be authenticated.'
      );
    }

    // By pass restriction on now allowing external API access by setting
    // provider to undefined (backend) for the next call
    const nestedParams = Object.assign({}, params, { provider: undefined });

    const id = params.user._id;
    const Patient = this.app.service('api/patients');

    return Patient.find({ query: { userId: id } }, nestedParams)
      .then(patients => {
        if (patients && patients.length > 0) {
          return patients[0];
        } else {
          throw new errors.NotFound('No profile found');
        }
      })
      .catch(error => {
        throw error;
      });
  }

  update(id, data, params) {
    if (!params.user) {
      throw new errors.NotAuthenticated(
        'The current user is missing. You must not be authenticated.'
      );
    }

    // By pass restriction on now allowing external API access by setting
    // provider to undefined (backend) for the next call
    const nestedParams = Object.assign({}, params, { provider: undefined });

    const userId = params.user._id;
    const Patient = this.app.service('api/patients');

    return Patient.find({ query: { userId: userId } }).then(patients => {
      if (patients && patients.length > 0) {
        const patient = patients[0];
        data.userId = patient.userId;
        data.hcps = patient.hcps;
        data.generalConsent = patient.generalConsent;

        return Patient.update(patient._id, data, nestedParams)
          .then(profile => {
            return profile;
          })
          .catch(error => {
            throw error;
          });
      } else {
        throw new errors.NotFound('No profile found');
      }
    });
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
