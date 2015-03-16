var Posts = require('../models/post.js');
var Users = require('../models/user.js');
var Images = require('../models/image.js');
var moment = require('moment');

var readController = {
  getAllPosts: function(req, res) {

    Posts.paginate({published : true}, req.query.page, req.query.limit, 
      function(err, pageCount, posts, itemCount){

        if (err) return next(err);
        
        if(req.user){      
          Users.findById(req.user._id, function(err, user){
            // Send to template for rendering
            res.render('../themes/'+ user.theme +'/index', {
              loggedIn : req.user,
              posts:posts,
              pageCount : pageCount,
              moment : moment});
          });
        }
        else {
          res.render('../themes/default/index', { 
            posts: posts,
            pageCount : pageCount,
            moment : moment });
        }  
      }, {sortBy : {createdAt : -1}});
  },

  getByUser: function(req, res){

    var userid = req.params.userid;
    Posts.paginate({owner: userid, published : true}, req.query.page, req.query.limit, 
      function(err, pageCount, posts, itemCount){

        if (err) return next(err);

        // Get the author's info
        Users.findById(userid, function(err, user){

          // Render the page in the logged-in user's theme
          if(req.user){
            Users.findById(req.user._id, function(err, user){
              // Send to template for rendering
              res.render('../themes/'+ user.theme +'/user', {
                loggedIn : req.user,
                user : user,
                posts: posts,
                moment:moment,
                pageCount:pageCount});
            });
          }
          // If not logged in, render in the default theme
          else{
            res.render('../themes/default/user', { 
                posts : posts, 
                user  : user,
                moment:moment,
                pageCount:pageCount});          
          }
        });
    }, {sortBy : {createdAt : -1}});
  },

  getSinglePost: function(req, res){
    var postid = req.params.postid;

    // Get post by ID
    Posts.findById(postid, function(err, post){

      // Render the page in the user's theme
      if(req.user){
        Users.findById(req.user._id, function(err, user){
          // Send to template for rendering
          res.render('../themes/'+ user.theme +'/post', {
            loggedIn : req.user,
            post: post,
            moment : moment});
        });
      }
      // If not logged in, render in the default theme
      else{
        res.render('../themes/default/post', {
          post : post,
          moment : moment
        });         
      }
    });
  },

  getByTag: function(req, res){
    var tag = req.params.tag;

    Posts.paginate({tags : tag}, req.query.page, req.query.limit, 
      function(err, pageCount, posts, itemCount){

        if (err) return next(err);
        
        if(req.user){      
          Users.findById(req.user._id, function(err, user){
            // Send to template for rendering
            res.render('../themes/'+ user.theme +'/index', {
              loggedIn : req.user,
              posts:posts,
              pageCount : pageCount,
              moment: moment});
          });
        }
        else {
          res.render('../themes/default/index', { 
            posts: posts,
            pageCount : pageCount,
            moment:moment });
        }  
      }, {sortBy : {createdAt : -1}});
  },

  getImage: function(req, res){
    var imageid = req.params.imageid;
    Images.findById(imageid, function(err, image){
      res.send(image.img.data);
    });
  }
};

module.exports = readController;