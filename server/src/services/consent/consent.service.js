// Initializes the `consent` service on path `/api/consent`
const createService = require('./consent.class.js');
const hooks = require('./consent.hooks');
const filters = require('./consent.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'consent',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/consent', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/consent');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
