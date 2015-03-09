var mongoose = require('mongoose');

var blogSchema = mongoose.Schema({
  title: String,
  description: String, 
  theme: String
});

module.exports = mongoose.model('Blog', blogSchema);