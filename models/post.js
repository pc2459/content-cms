var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  timestamp: {type: Date, default: Date.now},
  title: String,
  body: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  ownerName: String,
  tags: [String],
  // 0 - unpublished, 1 - published
  published: Boolean
});

module.exports = mongoose.model('Post', postSchema);