const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const { hashPassword } = require('feathers-authentication-local').hooks;

const {
  disallow,
  preventChanges,
  isProvider,
  iff
} = require('feathers-hooks-common');
const verifyHooks = require('feathers-authentication-management').hooks;

const fetchProfile = require('./hooks/fetch-profile');
const bounce = require('../../hooks/bounce');
const mailUser = require('./hooks/mail-user');

const restrict = [
  authenticate('jwt'),
  bounce(),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

module.exports = {
  before: {
    all: [],
    find: [disallow('external'), authenticate('jwt')],
    get: [...restrict],
    create: [
      disallow('external'),
      hashPassword(),
      verifyHooks.addVerification('api/management')
    ],
    update: [disallow('external'), hashPassword()],
    patch: [
      ...restrict,
      iff(
        isProvider('external'),
        preventChanges(
          'password',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        )
      )
    ],
    remove: [disallow('external'), ...restrict]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
    find: [],
    get: [fetchProfile()],
    create: [mailUser(), verifyHooks.removeVerification()],
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
