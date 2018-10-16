// event-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const uuid = require('uuid');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  // const defaultData = {
  //   value: 0,
  //   itch: 0,
  //   hive: 0
  // };
  // const DayData = new Schema(
  //   {
  //     value: {
  //       type: Number,
  //       default: 0,
  //       min: 0,
  //       max: 12
  //     },
  //     itch: {
  //       type: Number,
  //       default: 0,
  //       min: 0,
  //       max: 3
  //     },
  //     hive: {
  //       type: Number,
  //       default: 0,
  //       min: 0,
  //       max: 3
  //     }
  //   },
  //   { id: false, _id: false }
  // );

  const Data = new Schema(
    {
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
    { id: false, _id: false }
  );

  const UASWeek = new Schema({
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
    total: {
      type: Number,
      required: true,
      min: 0,
      max: 42
    },
    data: {
      type: Data,
      default: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
      }
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

  return mongooseClient.model('uas-week', UASWeek);
};
