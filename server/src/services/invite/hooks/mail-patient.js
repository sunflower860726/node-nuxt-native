/* eslint-disable no-unused-vars */
module.exports = function(options) {
  return function(hook) {
    // If it was an internal call then skip this hook
    if (!hook.params.provider) {
      return hook;
    }

    const Mailgun = hook.app.service('mail');

    const domain = hook.app.get('url');
    const sender = hook.app.get('email') || 'noreply@urtic.ca';
    const html = `${hook.result.message}<br /><p>Invite Code: ${
      hook.result.token
    }<br/><a href="${domain}/mobile/${hook.result.token}">Accept</a>`;

    const email = {
      from: sender,
      to: hook.result.patientEmail,
      subject: 'Urtic physician invite',
      html: html
    };

    return Mailgun.create(email).then(() => {
      return hook;
    });
  };
};
