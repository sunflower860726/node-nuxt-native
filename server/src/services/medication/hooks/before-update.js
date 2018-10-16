// src/services/event/hooks/create.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const errors = require('feathers-errors');

const defaults = {};

/* eslint-disable no-unused-vars */
module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    if (hook.id === undefined || hook.id === null) {
      throw new errors.BadRequest('id is required');
    }

    // Retrieve existing version
    return this.get(hook.id).then(event => {
      hook.data.userId = event.userId;
      hook.data.patientId = event.patientId;
      hook.data.revision = event.revision + 1;
      hook.data.createdAt = event.createdAt;

      var now = new Date();
      hook.data.updatedAt = now;

      return hook;
    });
  };
};
