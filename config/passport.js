var User = require('../models/user.js');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

// Serialise and de-serialise the user

passport.serializeUser(function(user, next){
  next(null, user.id);
});

passport.deserializeUser(function(userid, next){
  User.findById(userid, function(err, user){
    next(null, user);
  });
});


// LOCAL SIGNUP 

var localSignUp = new LocalStrategy({
  passReqToCallback: true
},
  function(req, username, password, next){

    // Look for user in the database with the same username
    User.findOne({ 'local.username' : username}, function(err, user){
      if (err) return next(err);

      // If the user already exists, return false
      if (user){
        return next(null, false);
      }
      // Otherwise, create a new user 
      else {
        var newUser = new User();
        
        newUser.generateHash(password, function(err, hash){
          newUser.local.password = hash;
          newUser.local.username = username;
          newUser.email = req.body.email;

          // Save the user
          newUser.save(function(err){
            if (err) throw err;
            return next(null, newUser);
          });
        });
        
      }


    });
  }
);

passport.use('localSignUp', localSignUp);

