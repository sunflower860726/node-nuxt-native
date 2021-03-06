// Initializes the `patient` service on path `/patient`
const createService = require('feathers-mongoose');
const createModel = require('../../models/patient.model');
const hooks = require('./patient.hooks');
const filters = require('./patient.filters');

module.exports = function() {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'patient',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/patients', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/patients');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
