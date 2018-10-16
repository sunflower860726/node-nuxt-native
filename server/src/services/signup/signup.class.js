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
    const Patient = this.app.service('api/patients');
    const User = this.app.service('api/users');

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
      .then(result => {
        const users = result;
        if (users && users.length > 0) {
          if (users[0].roles.indexOf('patient') > -1) {
            throw new errors.BadRequest('E-mail already taken');
          } else {
            return User.patch(users[0].id, {
              $addToSet: {
                roles: ['patient']
              }
            });
          }
        } else {
          return User.create({
            _id: uuid.v4(),
            email: data.email,
            password: data.password,
            roles: ['patient']
          });
        }
      })
      .then(user => {
        // Assume that if the user does not exist then there
        // is no HCP for this e-mail either, continue.
        return Patient.create({
          _id: uuid.v4(),
          userId: user._id,
          name: data.name,
          email: data.email
        });
      });
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
