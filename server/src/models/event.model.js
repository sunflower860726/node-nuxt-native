// event-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const uuid = require('uuid');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const event = new Schema({
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
    type: {
      type: String, // UAS or AAS
      required: true
    },
    date: {
      type: String, // YYYY-MM-DD This should be the first day of the week
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    data: {
      type: {
        0: {
          type: Number,
          default: 0
        },
        1: {
          type: Number,
          default: 0
        },
        2: {
          type: Number,
          default: 0
        },
        3: {
          type: Number,
          default: 0
        },
        4: {
          type: Number,
          default: 0
        },
        5: {
          type: Number,
          default: 0
        },
        6: {
          type: Number,
          default: 0
        }
      },
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

  return mongooseClient.model('event', event);
};
