// src/services/event/hooks/create.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

/* eslint-disable no-unused-vars */
module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    if (!hook.params.provider) {
      return;
    }

    let user = hook.result;
    if (user) {
      let roles = user.roles;
      let id = user._id;
      let promises = [];
      const nestedParams = Object.assign({}, hook.params, {
        provider: undefined
      });

      roles.forEach(role => {
        if (role === 'patient') {
          const Patient = hook.app.service('api/patients');
          let findPatient = Patient.find(
            { query: { userId: id } },
            nestedParams
          )
            .then(patients => {
              if (patients && patients.length > 0) {
                hook.result.patient = patients[0];
              } else {
                console.error('could not fetch related patient profile');
              }
            })
            .catch(error => {
              console.error('could not fetch related patient profile');
            });
          promises.push(findPatient);
        } else if (role === 'hcp') {
          const Hcp = hook.app.service('api/hcps');
          let findHcp = Hcp.find({ query: { userId: id } }, nestedParams)
            .then(hcps => {
              if (hcps && hcps.length > 0) {
                hook.result.hcp = hcps[0];
              } else {
                console.error('could not fetch related hcp profile');
              }
            })
            .catch(error => {
              console.error('could not fetch related hcp profile');
            });
          promises.push(findHcp);
        }
      });

      return Promise.all(promises)
        .then(() => {
          return hook;
        })
        .catch(error => {
          throw error;
        });
    }
  };
};
