// log-stream-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const uuid = require('uuid');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const inviteStream = new Schema({
    _id: { type: String, default: uuid.v4 },

    // Information used for tracking the stream
    userId: { type: String, required: true },
    model: { type: String, required: true },
    modelId: { type: String, required: true },
    action: { type: String, required: true },
    revision: { type: Number, required: true, default: 0 },
    timestamp: { type: Date, default: Date.now },

    data: { type: Object, required: false }
  });

  return mongooseClient.model('logStream', inviteStream);
};
