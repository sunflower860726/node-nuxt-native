const { authenticate } = require('feathers-authentication').hooks;
const { when, disallow, discard } = require('feathers-hooks-common');
const {
  associateCurrentUser,
  restrictToOwner
} = require('feathers-authentication-hooks');

const beforeCreate = require('./hooks/before-create');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [restrictToOwner({ ownerField: 'userId' })],
    get: [restrictToOwner({ ownerField: 'userId' })],
    create: [associateCurrentUser({ as: 'userId' }), beforeCreate()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow('external')]
  },

  after: {
    all: [],
    find: [
      when(
        hook => hook.params.provider,
        discard('__v'),
        discard('userId'),
        discard('patientId')
      )
    ],
    get: [
      when(
        hook => hook.params.provider,
        discard('__v'),
        discard('userId'),
        discard('patientId')
      )
    ],
    create: [
      when(
        hook => hook.params.provider,
        discard('__v'),
        discard('userId'),
        discard('patientId')
      )
    ],
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
