const uuid = require('uuid');
const errors = require('feathers-errors');

/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  create(data, params) {
    const Hcp = this.app.service('api/hcps');
    const User = this.app.service('api/users');

    const inviteRequired = this.app.get('restrictByInviteCode');
    const inviteCode = this.app.get('inviteCode');

    // Invite code validation
    if (inviteRequired && !data.inviteCode) {
      throw new errors.BadRequest('Missing invite code');
    }
    if (inviteRequired && data.inviteCode !== inviteCode) {
      // Fill in the blank with the code
      throw new errors.BadRequest('Invite code incorrect');
    }

    // Input validation
    var errorMessages = [];
    if (!data.name) {
      errorMessages.push({
        path: 'name',
        value: data.name,
        message: 'Your name is required'
      });
    }

    if (!data.email) {
      errorMessages.push({
        path: 'email',
        value: data.email,
        message: 'Email address is required'
      });
    }

    if (!data.password) {
      errorMessages.push({
        path: 'password',
        value: data.password,
        message: 'Missing password'
      });
    }

    if (errorMessages.length > 0) {
      throw new errors.BadRequest('Missing required fields', {
        errors: errorMessages
      });
    }

    return User.find({
      query: {
        email: data.email
      }
    })
      .then(users => {
        if (users && users.length > 0) {
          if (users[0].roles.indexOf('hcp') > -1) {
            throw new errors.BadRequest('E-mail already taken');
          } else {
            return User.patch(users[0].id, {
              $addToSet: {
                roles: ['hcp']
              }
            });
          }
        } else {
          return User.create({
            _id: uuid.v4(),
            email: data.email,
            password: data.password,
            roles: ['hcp'],
            verificationToken: uuid.v4()
          });
        }
      })
      .then(user => {
        // Assume that if the user does not exist then there
        // is no HCP for this e-mail either, continue.
        return Hcp.create({
          _id: uuid.v4(),
          userId: user._id,
          patients: [],
          name: data.name,
          email: data.email,
          streetAddress: data.streetAddress
        });
      });
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
