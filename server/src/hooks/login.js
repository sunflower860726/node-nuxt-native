// src/services/event/hooks/create.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const uuid = require('uuid');

const defaults = {};

/* eslint-disable no-unused-vars */
module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const EventStream = hook.app.service('api/log-stream');
    return EventStream.create({
      _id: uuid.v4(),

      userId: hook.data.strategy,
      model: 'users',
      modelId:
        hook.data.strategy === 'local'
          ? hook.data.email
          : hook.data.accessToken,
      action: 'LOGIN',
      timestamp: new Date()
    }).then(event => {
      return hook;
    });
  };
};
