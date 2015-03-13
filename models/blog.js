var mongoose = require('mongoose');

var blogSchema = mongoose.Schema({
  title: String,
  description: String, 
  theme: {type: String, default: 'default'}
});

module.exports = mongoose.model('Blog', blogSchema);