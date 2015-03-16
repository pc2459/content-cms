var Posts = require('../models/post.js');
var Users = require('../models/user.js');

var authController = {
  signupForm: function(req, res) {
    // console.log(req.flash('signUpError'));
    res.render('admin/signup', { error: req.flash('signUpError') });
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