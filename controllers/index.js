var Posts = require('../models/post.js');

var indexController = {
	index: function(req, res) {

    // Get all posts
    Posts.find({}, function(err, posts){
      if (err) console.log(err);
      // Send to template for rendering
      res.render('index', {posts:posts});
    });		
	}

};

module.exports = indexController;