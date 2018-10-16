// event-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const uuid = require('uuid');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const AQOL = new Schema({
    _id: {
      type: String,
      default: uuid.v4
    },

    userId: {
      type: String,
      required: true
    },
    patientId: {
      type: String,
      required: true
    },

    // Store date as string so there is no timezone concerns
    date: {
      type: String, // YYYY-MM-DD This should be the first day of the week
      required: true
    },
    value: {
      type: Number,
      default: 0,
      min: 0
    },
    results: [Number],

    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });

  return mongooseClient.model('aqol', AQOL);
};
