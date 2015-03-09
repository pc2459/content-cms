var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  // 0 = admin, 1 = user
  permissions: {type: Number, default: 0},
  name: String,
  bio: String,
  avatarUrl: String
});

module.exports = mongoose.model('User', userSchema);