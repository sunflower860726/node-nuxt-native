const { authenticate } = require('feathers-authentication').hooks;
const { when, disallow, discard } = require('feathers-hooks-common');
const { restrictToRoles } = require('feathers-authentication-hooks');

const restrictToAssigned = require('./hooks/restrict-to-assigned');
const stub = require('./hooks/stub');
const bounce = require('../../hooks/bounce');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [bounce(), restrictToRoles({ roles: ['hcp'] }), restrictToAssigned()],
    get: [bounce(), restrictToRoles({ roles: ['hcp'] }), restrictToAssigned()],
    create: [disallow('external')],
    update: [disallow('external')],
    patch: [disallow('external')],
    remove: [disallow('external')]
  },

  after: {
    all: [
      when(
        hook => hook.params.provider,
        discard('__v'),
        discard('hcps'),
        discard('userId')
      )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
