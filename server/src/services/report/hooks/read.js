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

      userId: hook.params.user._id,
      model: 'reports',
      modelId: hook.id,
      action: 'READ',
      timestamp: new Date(),
      data: {
        patients: hook.params.query.patients,
        startDate: hook.params.query.startDate,
        endDate: hook.params.query.endDate
      }
    }).then(event => {
      return hook;
    });
  };
};
