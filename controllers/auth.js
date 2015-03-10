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
  }

};

module.exports = authController;