// Initializes the `event` service on path `/event`
const createService = require('feathers-mongoose');
const createModel = require('../../models/uas-week.model');
const hooks = require('./uas-week.hooks');
const filters = require('./uas-week.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'uas-week',
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
        schema: { $ref: '#/definitions/uas-week' }
      }
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/uas-week', events);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/uas-week');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
