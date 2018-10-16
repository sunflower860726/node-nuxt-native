const { authenticate } = require('feathers-authentication').hooks;
const { when, disallow, discard } = require('feathers-hooks-common');
const {
  queryWithCurrentUser,
  associateCurrentUser,
  restrictToOwner,
  restrictToRoles
} = require('feathers-authentication-hooks');

const beforeCreate = require('./hooks/before-create');
const beforePatch = require('./hooks/before-patch');
const afterCreate = require('./hooks/after-create');
const afterPatch = require('./hooks/after-patch');
const afterDelete = require('./hooks/after-delete');
const mailPatient = require('./hooks/mail-patient');
const restrictToAssigned = require('./hooks/restrict-to-assigned');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [restrictToAssigned(), queryWithCurrentUser({ as: 'userId' })],
    get: [disallow('external')],
    create: [
      restrictToRoles({ roles: ['hcp'] }),
      associateCurrentUser({ as: 'userId' }),
      beforeCreate()
    ],
    update: [disallow()],
    patch: [
      restrictToRoles({ roles: ['hcp'] }),
      restrictToOwner({ ownerField: 'userId' }),
      beforePatch()
    ],
    remove: [
      restrictToRoles({ roles: ['hcp'] }),
      restrictToOwner({ ownerField: 'userId' })
    ]
  },

  after: {
    all: [
      when(
        hook => hook.params.provider,
        discard('__v'),
        discard('userId'),
        discard('hcpId')
      )
    ],
    find: [],
    get: [],
    create: [mailPatient()],
    update: [],
    patch: [mailPatient()],
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
