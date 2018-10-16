// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const uuid = require('uuid');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    _id: { type: String, default: uuid.v4 },

    email: { type: String, unique: true },
    password: { type: String },
    roles: [{ type: String, required: true }],
    isVerified: { type: Boolean },
    verifyToken: { type: String },
    verifyShortToken: { type: String },
    verifyExpires: { type: Date },
    verifyChanges: Object,
    resetToken: { type: String },
    resetShortToken: { type: String },
    resetExpires: { type: Date },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('users', users);
};
