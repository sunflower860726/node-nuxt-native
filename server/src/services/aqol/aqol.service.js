// Initializes the `event` service on path `/event`
const createService = require('feathers-mongoose');
const createModel = require('../../models/aqol.model');
const hooks = require('./aqol.hooks');
const filters = require('./aqol.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'aqol',
    Model,
    paginate
  };

  const events = createService(options);

  // Configure documentation
  events.docs = {
    definitions: {
      aqol: {},
      'aqol list': {
        type: 'array',
        schema: { $ref: '#/definitions/aqol' }
      }
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/aqol', events);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/aqol');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
