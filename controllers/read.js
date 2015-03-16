var Posts = require('../models/post.js');
var Users = require('../models/user.js');
var moment = require('moment');

var readController = {
  getAllPosts: function(req, res) {

    Posts.paginate({}, req.query.page, req.query.limit, 
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


    // // Get all posts
    // Posts.find({published : true}, null, {sort: {createdAt : -1}}, function(err, results){
    //   if (err) console.log(err);

    //   if(req.user){      
    //     Users.findById(req.user._id, function(err, user){
    //       // Send to template for rendering
    //       res.render('../themes/'+ user.theme +'/index', {
    //         loggedIn : req.user,
    //         posts:results});
    //     });
    //   }
    //   else {
    //     res.render('../themes/default/index', { posts: results });
    //   }
    // });   

  },

  getByUser: function(req, res){
    var userid = req.params.userid;
    // Get all posts by userid
    Posts.find({owner:userid}, function(err, posts){

      // Get the user's info
      Users.findById(userid, function(err, user){

        // Render the page in the user's theme
        if(req.user){
          Users.findById(req.user._id, function(err, user){
            // Send to template for rendering
            res.render('../themes/'+ user.theme +'/user', {
              loggedIn : req.user,
              posts: posts,
              moment:moment});
          });
        }
        // If not logged in, render in the default theme
        else{
          res.render('../themes/default/user', { 
              posts : posts, 
              user  : user,
              moment:moment});          
        }
      });
    });
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


    // Posts.find({ tags : tag}, function(err, posts){

    //   if(req.user){
    //     Users.findById(req.user._id, function(err, user){
    //       res.render('../themes/'+ user.theme +'/index', {
    //           loggedIn : req.user,
    //           posts : posts});
    //     });
    //   }
    //   res.render('../themes/default/index', {
    //       posts : posts});
    // });
  }

};

module.exports = readController;