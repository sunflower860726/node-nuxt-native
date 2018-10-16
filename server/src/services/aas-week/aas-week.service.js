// Initializes the `event` service on path `/event`
const createService = require('feathers-mongoose');
const createModel = require('../../models/aas-week.model');
const hooks = require('./aas-week.hooks');
const filters = require('./aas-week.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'aas',
    Model,
    paginate
  };

  const events = createService(options);

  // Configure documentation
  events.docs = {
    definitions: {
      aas: {},
      'aas list': {
        type: 'array',
        schema: { $ref: '#/definitions/aas-week' }
      }
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/aas-week', events);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/aas-week');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
