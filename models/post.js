var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var postSchema = mongoose.Schema({
  createdAt: {type: Date, default: Date.now},
  editedAt: {type: Date, default: Date.now},
  title: String,
  body: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  ownerName: String,
  tags: [String],
  // 0 - unpublished, 1 - published
  published: Boolean
});

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', postSchema);