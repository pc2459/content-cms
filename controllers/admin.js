var Posts = require('../models/post.js');
var Users = require('../models/user.js');
var marked = require('marked');
var htmlmd = require('html-md');

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

      post.body = htmlmd(post.body);
      res.render('admin/edit', {post:post});
    });
  },

  saveEditedPost: function(req, res){

    var postid = req.params.postid;
    var title = req.body.posttitle;
    var markdownBody = req.body.posttext;
    var htmlBody = marked(markdownBody);
    var tags = req.body.tags.split(',');

    console.log("Tags:", tags);

    var update = {
      title : title,
      body : htmlBody,
      tags : tags

      // Also change edit date...
      // Publish status...
    };

    Posts.findByIdAndUpdate(postid, update, function(err, post){
      console.log("Successfully updated post?");
      // console.log(post);
      res.redirect('/admin');
    });


  }


};

module.exports = adminController;