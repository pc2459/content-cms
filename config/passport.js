var Blog = require('../models/blog.js');
var User = require('../models/user.js');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
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
        return next(null, false, req.flash('signUpError', 'That username is taken.'));
      }
      // Otherwise, create a new user 
      else {
        var newUser = new User();
        
        newUser.generateHash(password, function(err, hash){

          newUser.local.password = hash;
          newUser.local.username = username;
          newUser.email = req.body.email;
          newUser.name = req.body.name;

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

// LOCAL SIGNIN 
var localSignIn = new LocalStrategy({
  passReqToCallback: true
},
  function(req, username, password, next){

    // Check to see if user is in the database
    User.findOne({'local.username':username}, function(err, user){

      if (err) return next(err);

      // If user is not found...
      if (!user){
        return next(null, false, req.flash('loginError', 'No user found.'));
      }

      user.comparePassword(password, function(err, isMatch){
        if (err) return next(err);

        // Passwords don't match...
        if(!isMatch){
          return next(null, false, req.flash('loginError', 'Wrong password.'));
        }
        // Passwords match... so return the user
        else {
          return next(null, user);
        }
      });

    });
  }
);

// FACEBOOK SIGNIN

var fbSignIn = new FacebookStrategy({
  // Pass it the API details
  clientID : process.env.FACEBOOK_APPID,
  clientSecret : process.env.FACEBOOK_SECRET,
  callbackURL : 'http://localhost:9434/auth/facebook/callback',
  passReqToCallback: true
},
  function(req, token, refreshToken, profile, next){
    // Find the user and return them if they exist in the DB
    User.findOne({'facebook.id' : profile.id}, function(err, user){
      if (err) return next(err);

      // If the user is found, return them
      if (user) {
        return next(null, user);
      }

      // Otherwise, create the user and store them
      else {
        //First check if registration is open
        
        Blog.findOne({}, function(err, blog){


          if(blog.registrationOpen){
            var newUser = new User();

            newUser.facebook.id = profile.id;
            newUser.facebook.token = token,
            newUser.name = profile.name.givenName;
            if(profile.emails){
              newUser.email = profile.emails[0].value;
            }

            newUser.save(function(err){
              if (err) throw err;

              //return the saved new user
              return next(null, newUser);
            });
          }
          else{
            return next(null, false, req.flash('loginError', 'Registration is closed.'));
          }
        });
        
        // var newUser = new User();

        // newUser.facebook.id = profile.id;
        // newUser.facebook.token = token,
        // newUser.name = profile.name.givenName;
        // if(profile.emails){
        //   newUser.email = profile.emails[0].value;
        // }

        // newUser.save(function(err){
        //   if (err) throw err;

        //   //return the saved new user
        //   return next(null, newUser);
        // });

      } //end else
    });
  }
);

// Make passport use these strategies
passport.use('localSignUp', localSignUp);
passport.use('localSignIn', localSignIn);
passport.use('fbSignIn', fbSignIn);


// Middleware to check if user is logged in or not
module.exports = {
  isLoggedIn : function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    else{
      res.redirect('/signin');
    }
  }
};
