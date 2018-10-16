'use strict';

// src/services/invite/hooks/delete-invite.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const uuid = require('uuid');
const moment = require('moment');

/* eslint-disable no-unused-vars */
module.exports = function(options) {
  return function(hook) {
    const InviteStream = hook.app.service('api/log-stream');
    return InviteStream.create({
      _id: uuid.v4(),
      model: 'invite',
      modelId: hook.id,
      action: 'DeleteInvite',
      revision: hook.result.revision + 1,
      timestamp: moment()
    }).then(() => {
      return hook;
    });
  };
};
