const {
  getEmailBody,
  getVerifyHtml
} = require('../../../auth-management-utils');

/* eslint-disable no-unused-vars */
module.exports = function(options) {
  return function(hook) {
    if (hook.result.isVerified) {
      return hook; // Do nothing if user is already verified
    }

    const Mailgun = hook.app.service('mail');
    const html = getVerifyHtml(hook.app, hook.result.verifyToken);
    const emailBody = getEmailBody(hook.app, 'verify', hook.result.email, html);
    return Mailgun.create(emailBody).then(() => {
      return hook;
    });
  };
};
