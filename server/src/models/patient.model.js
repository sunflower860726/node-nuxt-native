// patient-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const uuid = require('uuid');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const patient = new Schema({
    // The patient e-mail address
    _id: { type: String, default: uuid.v4 },
    userId: { type: String, required: true },
    hcps: [{ type: String }],

    name: { type: String },
    email: { type: String },
    healthNumber: { type: String },
    age: { type: Number },
    sex: { type: String },
    symptom: { type: String },

    generalConsent: { type: Boolean, default: false },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('patient', patient);
};
