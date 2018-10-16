const { authenticate } = require('feathers-authentication').hooks;
const { when, disallow, discard } = require('feathers-hooks-common');
const {
  associateCurrentUser,
  restrictToOwner,
} = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [disallow('external')],
    get: [restrictToOwner({ ownerField: 'userId' })],
    create: [disallow('external')],
    update: [disallow()],
    patch: [
      restrictToOwner({ ownerField: 'userId' }),
      associateCurrentUser({ as: 'userId' })
    ],
    remove: [disallow('external')]
  },

  after: {
    all: [when(hook => hook.params.provider, discard('__v'))],
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
