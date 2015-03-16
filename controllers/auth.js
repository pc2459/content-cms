var Posts = require('../models/post.js');
var Users = require('../models/user.js');
var Blogs = require('../models/blog.js');

var authController = {
  signupForm: function(req, res) {
    Blogs.findOne({}, function(err, blog){
      if (blog.registrationOpen) {
        res.render('admin/signup', { error: req.flash('signUpError') });      
      }
      else{
        console.log("Ended up in the else loop");
        req.flash('loginError', 'Registration is closed.');
        res.redirect('admin/signin');
      }
    });
  },

  getSignedIn: function(req, res){
    res.render('testsignedin', {
      user: req.user
    });
  },
  
  signInIndex: function(req, res){
    res.render('admin/signin', { error: req.flash('loginError') });
  },

  logout: function(req, res){
    req.logout();
    res.redirect('/');
  }

};

module.exports = authController;