'use strict';

// src/services/invite/hooks/create-invite-event.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const uuid = require('uuid');

/* eslint-disable no-unused-vars */
module.exports = function(options) {
  return function(hook) {
    const InviteStream = hook.app.service('api/log-stream');
    return InviteStream.create({
      _id: uuid.v4(),
      model: 'invite',
      modelId: hook.result._id,
      action: 'CreateInvite',
      revision: 0,
      timestamp: hook.result.updatedAt,
      data: hook.data
    }).then(invite => {
      return hook;
    });
  };
};
