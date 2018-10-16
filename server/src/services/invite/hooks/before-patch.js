'use strict';

// src/services/invite/hooks/create-invite-event.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const uuid = require('uuid');
const moment = require('moment');
const errors = require('feathers-errors');

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    // If it was an internal call then skip this hook
    if (!hook.params.provider) {
      return hook;
    }

    const submittedData = hook.data;

    // Validations for minimum values
    var errorMessages = [];
    if (
      !submittedData.sent ||
      typeof submittedData.sent !== 'string' ||
      submittedData.sent.length !== 19
    ) {
      errorMessages.push({
        path: 'sent',
        value: submittedData.sent,
        message:
          'Invite must contain a sent time of format "2011-03-05 17:04:45"'
      });
    }

    if (errorMessages.length > 0) {
      throw new errors.BadRequest('Invalid Request', {
        errors: errorMessages
      });
    }

    const now = moment();

    return this.get(hook.id).then(invite => {
      // Shape hook.data so that we only have specific values we want to allow
      // We don't allow any values to change on resend, only sent time
      const revision = invite.revision + 1;
      hook.data = {
        updatedAt: now.toDate(),
        sent: submittedData.sent,
        revision: revision
      };

      return hook;
    });
  };
};
