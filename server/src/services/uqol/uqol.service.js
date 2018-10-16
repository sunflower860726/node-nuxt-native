// Initializes the `event` service on path `/event`
const createService = require('feathers-mongoose');
const createModel = require('../../models/uqol.model');
const hooks = require('./uqol.hooks');
const filters = require('./uqol.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'uqol',
    Model,
    paginate
  };

  const events = createService(options);

  // Configure documentation
  events.docs = {
    definitions: {
      uqol: {},
      'uqol list': {
        type: 'array',
        schema: { $ref: '#/definitions/uqol' }
      }
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/uqol', events);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/uqol');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
