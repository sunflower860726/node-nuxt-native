// Initializes the `log-stream` service on path `/api/log-stream`
const createService = require('feathers-mongoose');
const createModel = require('../../models/log-stream.model');
const hooks = require('./log-stream.hooks');
const filters = require('./log-stream.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'log-stream',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/log-stream', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/log-stream');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
