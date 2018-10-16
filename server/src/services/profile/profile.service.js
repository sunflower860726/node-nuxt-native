// Initializes the `profile` service on path `/api/profile`
const createService = require('./profile.class.js');
const hooks = require('./profile.hooks');
const filters = require('./profile.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'profile',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/profile', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/profile');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
