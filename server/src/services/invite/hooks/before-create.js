'use strict';

// src/services/invite/hooks/create-invite-event.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const moment = require('moment');
const errors = require('feathers-errors');

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    const user = hook.params.user;
    const submittedData = hook.data;

    // Validations for minimum values
    var errorMessages = [];
    if (!submittedData.patientEmail) {
      errorMessages.push({
        path: 'patientEmail',
        value: submittedData.patientEmail,
        message: 'Invite must have an e-mail address'
      });
    }

    if (!submittedData.message) {
      errorMessages.push({
        path: 'message',
        value: submittedData.message,
        message: 'Invite must contain a message'
      });
    }

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
    hook.data.createdAt = now.toDate();
    hook.data.updatedAt = now.toDate();

    const Hcp = hook.app.service('api/hcps');

    const genToken = function() {
      // Generate a random password with length 12 that contains
      // uppercase, lowercase and numbers
      var characters = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var password = '';
      for (var ii = 0; ii < 8; ii++) {
        var random = Math.floor(Math.random() * characters.length);
        password += characters[random];
      }
      return password;
    };

    const inviteToken = genToken();

    // Shape hook.data so that we only have specific values we want to allow
    return Hcp.find({ query: { userId: user._id } }).then(hcps => {
      var hcp = hcps[0];
      hook.data.userId = user._id;
      hook.data.hcpId = hcp._id;
      hook.data.token = inviteToken;
      return hook;
    });
  };
};
