var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'}
});

module.exports = mongoose.model('Image', imageSchema);