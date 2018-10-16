// event-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const uuid = require('uuid');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const Medication = new Schema(
    {
      name: {
        type: String,
        required: true
      },
      frequency: {
        type: String,
        required: true
      },
      quantity: {
        // Number of times a day
        type: Number,
        required: true
      },
      dose: {
        // Quantity per intake
        type: Number,
        required: true
      }
    },
    { id: false, _id: false }
  );
  const MedicationList = new Schema({
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
      type: String, // YYYY-MM-DD This should be the day the medication list was updated
      required: true
    },
    medications: {
      type: [Medication],
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });

  return mongooseClient.model('medication-list', MedicationList);
};
