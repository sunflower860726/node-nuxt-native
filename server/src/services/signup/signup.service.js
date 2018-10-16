// Initializes the `hcp-signup` service on path `/api/hcp-signup`
const createService = require('./signup.class.js');
const hooks = require('./signup.hooks');
const filters = require('./signup.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'signup',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/signup', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/signup');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
