const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const multer = require('multer');
const dauria = require('dauria');

const { discard } = require('feathers-hooks-common');
const { authenticate } = require('feathers-authentication').hooks;

module.exports = function() {
  const app = this;
  const blobStorage = fs(__dirname + '/uploads');
  const multipart = multer();

  // Set up authentication with the secret
  app.use(
    '/api/uploads',
    multipart.single('uri'),
    function(req, res, next) {
      req.feathers.file = req.file;
      next();
    },
    blobService({ Model: blobStorage })
  );

  app.service('api/uploads').hooks({
    before: {
      all: [authenticate('jwt')],
      create: [
        function(hook) {
          if (!hook.data.uri && hook.params.file) {
            const file = hook.params.file;
            const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
            hook.data = { uri: uri };
          }
        }
      ]
    },
    after: {
      create: [discard('uri')]
    }
  });
};
