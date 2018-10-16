const { authenticate } = require('feathers-authentication').hooks;
const { restrictToRoles } = require('feathers-authentication-hooks');

const bounce = require('../../hooks/bounce');
const read = require('./hooks/read');

module.exports = {
  before: {
    all: [authenticate('jwt'), bounce()],
    get: [restrictToRoles({ roles: ['hcp'] }), read()]
  },

  after: {
    all: [],
    get: []
  },

  error: {
    all: [],
    get: []
  }
};
