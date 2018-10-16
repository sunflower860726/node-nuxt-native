const { disallow } = require('feathers-hooks-common');
const mailgunService = require('feathers-mailgun');

module.exports = function() {
  const app = this;

  app.use(
    '/mail',
    mailgunService({
      apiKey: 'key-3d82dde7247593380ff4515380b882b4',
      domain: 'mg.mimonitor.ca'
    })
  );

  app.service('mail').hooks({
    before: {
      all: [disallow('external')]
    }
  });
};
