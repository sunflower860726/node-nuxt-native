const createService = require('feathers-mongoose');
const createModel = require('../../models/medication.model');
const hooks = require('./medication.hooks');
const filters = require('./medication.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'medication',
    Model,
    paginate
  };

  const events = createService(options);

  // Configure documentation
  events.docs = {
    definitions: {
      medications: {},
      'medications list': {
        type: 'array',
        schema: { $ref: '#/definitions/medications' }
      }
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/medications', events);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/medications');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
