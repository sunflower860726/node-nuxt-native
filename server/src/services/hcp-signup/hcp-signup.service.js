// Initializes the `hcp-signup` service on path `/api/hcp-signup`
const createService = require('./hcp-signup.class.js');
const hooks = require('./hcp-signup.hooks');
const filters = require('./hcp-signup.filters');

module.exports = function() {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'hcp-signup',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/hcp-signup', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/hcp-signup');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
