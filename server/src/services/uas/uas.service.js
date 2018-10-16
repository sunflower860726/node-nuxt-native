// Initializes the `event` service on path `/event`
const createService = require('feathers-mongoose');
const createModel = require('../../models/uas.model');
const hooks = require('./uas.hooks');
const filters = require('./uas.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'uas',
    Model,
    paginate
  };

  const events = createService(options);

  // Configure documentation
  events.docs = {
    definitions: {
      uas: {},
      'uas list': {
        type: 'array',
        schema: { $ref: '#/definitions/uas' }
      }
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/uas', events);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/uas');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
