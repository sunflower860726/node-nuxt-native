// Initializes the `event` service on path `/event`
const createService = require('feathers-mongoose');
const createModel = require('../../models/control-test.model');
const hooks = require('./control-test.hooks');
const filters = require('./control-test.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'control-test',
    Model,
    paginate
  };

  const events = createService(options);

  // Configure documentation
  events.docs = {
    definitions: {
      controTest: {},
      'control-test list': {
        type: 'array',
        schema: { $ref: '#/definitions/control-test' }
      }
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/control-test', events);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/control-test');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
