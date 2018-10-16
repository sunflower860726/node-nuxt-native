// Initializes the `invite` service on path `/api/invite`
const createService = require('feathers-mongoose');
const createModel = require('../../models/invite.model');
const hooks = require('./invite.hooks');
const filters = require('./invite.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'invite',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/invites', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/invites');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
