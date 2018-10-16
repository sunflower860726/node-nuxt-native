// src/services/patient/hooks/restrict-to-hcp.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {
  idField: '_id',
  ownerField: 'userId'
};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    console.log(hook.params);
    return hook;
  };
};
