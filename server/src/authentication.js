const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const management = require('feathers-authentication-management');

const login = require('./hooks/login');
const logout = require('./hooks/logout');
const loginError = require('./hooks/login-error');
const {
  getEmailBody,
  getVerifyHtml,
  getResetHtml
} = require('./auth-management-utils');

module.exports = function() {
  const app = this;
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(
    management({
      skipIsVerifiedCheck: true,
      service: 'api/users',
      path: 'api/management',
      notifier: function(type, user, notifierOptions) {
        const Mailgun = app.service('mail');
        switch (type) {
        case 'resendVerifySignup': {
          let verifyContent = getVerifyHtml(app, user.verifyToken);
          let emailBody = getEmailBody(
            app,
            'verify',
            user.email,
            verifyContent
          );
          return Mailgun.create(emailBody);
        }
        case 'sendResetPwd': {
          let resetContent = getResetHtml(app, user.resetToken);
          let emailBody = getEmailBody(
            app,
            'reset',
            user.email,
            resetContent
          );
          return Mailgun.create(emailBody);
        }
        case 'resetPwd': {
          const User = app.service('api/users');
          return User.patch(user._id, {
            isVerified: true
          });
        }
        case 'passwordChange':
        case 'identityChange':
        default:
          break;
        }
      }
    })
  );
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('api/authentication').hooks({
    before: {
      create: [authentication.hooks.authenticate(config.strategies)],
      remove: [authentication.hooks.authenticate('jwt')]
    },
    after: {
      create: [login()],
      remove: [logout()]
    },
    error: {
      create: [loginError()]
    }
  });
};
