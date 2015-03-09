var Posts = require('../models/post.js');
var Users = require('../models/user.js');

var readController = {
  index: function(req, res) {

    // Get all posts
    Posts.find({}, function(err, results){
      if (err) console.log(err);
      // Send to template for rendering
      res.render('index', {posts:results});
    });   
  },

  getByUser: function(req, res){

    var userid = req.params.userid;
    // Get all posts by userid
    Posts.find({owner:userid}, function(err, posts){

      // Get the user's info
      Users.findById(userid, function(err, user){
        
        // Send to template for rendering
        res.render('user', 
          { posts : posts, 
            user  : user});
      });
    });

  }

};

module.exports = readController;