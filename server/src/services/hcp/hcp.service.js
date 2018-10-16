// Initializes the `hcp` service on path `/hcp`
const createService = require('feathers-mongoose');
const createModel = require('../../models/hcp.model');
const hooks = require('./hcp.hooks');
const filters = require('./hcp.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'hcp',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/hcps', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/hcps');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
