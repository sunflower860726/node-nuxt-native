// src/services/patient/hooks/restrict-to-hcp.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const errors = require('feathers-errors');

module.exports = function() {
  return function(hook) {
    if (hook.type !== 'before') {
      throw new Error(
        'The "bounce" hook should only be used as a "before" hook.'
      );
    }

    // If it was an internal call then skip this hook
    if (!hook.params.provider) {
      return hook;
    }

    if (
      hook.params.user === undefined ||
      hook.params.user === null ||
      hook.params.user._id === undefined ||
      hook.params.user._id === null
    ) {
      throw new errors.NotAuthenticated('You are not authorized');
    }
    return hook;
  };
};
