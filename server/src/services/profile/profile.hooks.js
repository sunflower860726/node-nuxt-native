const { authenticate } = require('feathers-authentication').hooks;
const { when, discard } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    create: [
      when(
        hook => hook.params.provider,
        discard('_id'),
        discard('__v'),
        discard('hcps'),
        discard('userId')
      )
    ]
  },

  after: {
    all: [
      when(
        hook => hook.params.provider,
        discard('_id'),
        discard('__v'),
        discard('hcps'),
        discard('userId')
      )
    ]
  }
};
