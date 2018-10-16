function _getEmailBody(app, type, email, content) {
  const sender = app.get('email') || 'noreply@urtic.ca';
  let subject = '';
  switch (type) {
  case 'reset':
    subject = 'Urtic password reset';
    break;
  case 'verify':
    subject = 'Urtic email verification';
    break;
  }

  return {
    from: sender,
    to: email,
    subject: subject,
    html: content
  };
}

function _getVerifyHtml(app, token) {
  const domain = app.get('url');
  return `<p>Click the link to verify your e-mail address: <a href="${domain}/verify/${token}">Verify</a>`;
}

function _getResetHtml(app, token) {
  const domain = app.get('url');
  return `<p>Click the link to reset your password: <a href="${domain}/reset/${token}">Reset</a>`;
}

module.exports.getEmailBody = _getEmailBody;
module.exports.getVerifyHtml = _getVerifyHtml;
module.exports.getResetHtml = _getResetHtml;
