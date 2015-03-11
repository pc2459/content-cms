var Posts = require('../models/post.js');
var Users = require('../models/user.js');

var authController = {
  signupForm: function(req, res) {
    res.render('signup');
  },

  getSignedIn: function(req, res){
    res.render('testsignedin', {
      user: req.user
    });
  },
  
  signInIndex: function(req, res){
    res.render('signin');
  },

  logout: function(req, res){
    req.logout();
    res.redirect('/');
  }

};

module.exports = authController;