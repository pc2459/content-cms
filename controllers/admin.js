var Posts = require('../models/post.js');
var Users = require('../models/user.js');

var adminController = {
  getAllPosts: function(req, res) {

    // console.log(req.user);
    // Display all posts by the user
    Users.findById(req.user._id, function(err, user){

      Posts.find({'owner': user._id}, function(err, posts){
        res.render('admin/admin', {posts:posts});
      });

    });
  },

  editPost: function(req, res){
    var postid = req.params.postid;

    Posts.findById(postid, function(err, post){
      res.render('admin/edit', {post:post});
    });
  }

};

module.exports = adminController;