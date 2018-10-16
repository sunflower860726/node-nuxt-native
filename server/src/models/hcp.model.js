// hcp-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const uuid = require('uuid');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const hcp = new Schema({
    _id: { type: String, default: uuid.v4 },
    userId: { type: String, required: true },
    patients: [{ type: String }],

    name: { type: String, required: true },
    email: { type: String, required: false },
    streetAddress: { type: String, required: false },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('hcp', hcp);
};
