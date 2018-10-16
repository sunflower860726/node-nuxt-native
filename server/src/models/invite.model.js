// invite-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const uuid = require('uuid');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const invite = new Schema({
    _id: { type: String, default: uuid.v4 },

    userId: { type: String, required: true },
    hcpId: { type: String, required: true },
    revision: { type: Number, required: true, default: 0 },

    patientEmail: { type: String, required: true },
    message: { type: String, required: true }, // Message sent to the user
    token: { type: String, required: true },
    status: { type: String, default: 'pending' },
    sent: { type: String, required: true }, // YYYY-MM-DD hh:mm:ss

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('invite', invite);
};
