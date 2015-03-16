var fs = require('fs');
var Posts = require('../models/post.js');
var Users = require('../models/user.js');
var Image = require('../models/image.js')
var marked = require('marked');
var htmlmd = require('html-md');

var adminController = {
  getAllPosts: function(req, res) {



    // Display all posts by the user
    Users.findById(req.user._id, function(err, user){
      Posts.paginate({owner: user._id}, req.query.page, req.query.limit, 
        function(err, pageCount, posts, itemCount){

          if (err) return next(err);

          res.render('admin/admin', {
            posts:posts,
            pageCount: pageCount
          });
          
          // if(req.user){      
          //   Users.findById(req.user._id, function(err, user){
          //     // Send to template for rendering
          //     res.render('../themes/'+ user.theme +'/index', {
          //       loggedIn : req.user,
          //       posts:posts,
          //       pageCount : pageCount});
          //   });
          // }
          // else {
          //   res.render('../themes/default/index', { 
          //     posts: posts,
          //     pageCount : pageCount });
          // }  


        }, {sortBy : {createdAt : -1}});
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
    var published = req.body.published;

    Users.findById(req.user._id, function(err, user){

      var newPost = new Posts({
        title : title,
        body : htmlBody,
        tags : tags,
        owner: user._id,
        ownerName : user.name,
        published : published
      });

      newPost.save(function(){
        res.redirect('/admin');
      });
      

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
  },

  upload: function(req, res){


    var mimetype = req.files.image.mimetype;
    var path = req.files.image.path;
    var userid = req.user._id;

    var newImage = new Image();
    newImage.img.data = fs.readFileSync(path);
    newImage.img.contentType = req.files.mimetype;
    newImage.owner = userid;

    newImage.save(function(err, image){
      if (err) throw err;
      console.log("Saved image to mongodb.");
      res.send(image._id);
    });

  },

  getProfile: function(req, res){

    Users.findById(req.user._id, function(err, user){
      res.render('admin/profile', { 
        user:user,
        error:req.flash('changePWError'),
        success:req.flash('changePWMsg')
      });
    });
  },

  saveProfile: function(req, res){

    var update = {
      name : req.body.name,
      email : req.body.email,
      bio: req.body.bio,
      theme: req.body.theme
    };

    var userid = req.user._id;

    Users.findByIdAndUpdate(userid, update, function(err, user){

      // Update posts to reflect new name 
      Posts.update({owner : userid}, {$set : {ownerName : req.body.name}},
        {multi: true}, function(err, results){
          res.redirect('/admin/profile');
        });
    });
  },

  changePW: function(req, res){

    var oldpw = req.body.oldpw;
    // Twice-verified new password
    var newpw = req.body.newpw;
    var newpw2 = req.body.newpw2;

    Users.findById({_id: req.user._id}, function(err, user){

      // Compare the old password
      user.comparePassword(oldpw, function(err, isMatch){
        if (err) return err;
        // Old password doesn't match
        if(!isMatch){
          req.flash('changePWError', 'Incorrect password');
          res.redirect('/admin/profile');
        }

        else {
          // New passwords don't match
          if(newpw !== newpw2){
            req.flash('changePWError', 'New passwords do not match.');
            res.redirect('/admin/profile');
          }
          else{
            // Success
            req.flash('changePWMsg', 'Successfully changed password');
            res.redirect('/admin/profile');
          }
        }
      });
    });
  }


};

module.exports = adminController;