var mongoose = require('mongoose');

var blogSchema = mongoose.Schema({
  registrationOpen : Boolean
});

module.exports = mongoose.model('Blog', blogSchema);