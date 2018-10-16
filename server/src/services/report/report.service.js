// Initializes the `report` service on path `/api/report`
const createService = require('./report.class.js');
const hooks = require('./report.hooks');
const filters = require('./report.filters');

module.exports = function() {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'report',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/reports', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/reports');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
