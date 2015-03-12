var Posts = require('../models/post.js');
var Users = require('../models/user.js');
var marked = require('marked');
var htmlmd = require('html-md');

var adminController = {
  getAllPosts: function(req, res) {

    // Display all posts by the user
    Users.findById(req.user._id, function(err, user){

      Posts.find({'owner': user._id}, null, {sort:{editedAt: -1}}, function(err, posts){
        res.render('admin/admin', {posts:posts});
      });

    });
  },

  createPost: function(req, res){
    res.render('admin/create');
  },

  saveNewPost: function(req, res){

    console.log("Tags:", req.body.tags);
    var title = req.body.posttitle;
    var markdownBody = req.body.posttext;
    var htmlBody = marked(markdownBody);
    var tags = [];
    if(req.body.tags){
      tags = req.body.tags.split(',');
    }
    var published = !!req.body.published;

    Users.findById(req.user._id, function(err, user){

      var newPost = new Posts({
        title : title,
        body : htmlBody,
        tags : tags,
        owner: user._id,
        ownerName : user.name,
        published : published
      });

      newPost.save();
      res.redirect('/admin');

    });
  },

  deletePost: function(req, res){
    var postid = req.params.postid;
    Posts.findByIdAndRemove(postid, function(err, result){
      console.log("Deleted post");
      res.redirect('/admin');
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
    var tags = [];
    if(req.body.tags){
      tags = req.body.tags.split(',');
    }
    var published = req.body.published;
    console.log("Published:", req.body.published);

    var update = {
      title : title,
      body : htmlBody,
      tags : tags,
      editedAt : Date.now(),
      published : published

    };

    Posts.findByIdAndUpdate(postid, update, function(err, post){
      console.log("Successfully updated post?");
      // console.log(post);
      res.redirect('/admin');
    });


  }


};

module.exports = adminController;