// src/services/event/hooks/create.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const uuid = require('uuid');
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
      delete hook.data.createdAt;

      if (!hook.data.severity) {
        hook.data.severity = null;
      }

      if (!hook.data.daysOffWork) {
        hook.data.daysOffWork = null;
      }

      var now = new Date();
      hook.data.updatedAt = now;
      hook.data.revision = event.revision + 1;

      return hook;
    });
  };
};
