var express = require('express');
var bodyParser = require('body-parser');
var readController = require('./controllers/read.js');
var authController = require('./controllers/auth.js');
var _ = require('underscore');

// Dotenv to hide the good stuff
var dotenv = require('dotenv');
dotenv.load();

// Passport
var passport = require('passport');
var passportConfig = require('./config/passport.js');
var session = require('express-session');


// Database =============================================
 
// Database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/content');

// Seed database to set up Blog and one user 
require('./models/seeds/blogAndUserSeed.js');

// Seed database with dummy posts owned by the one user
require('./models/seeds/postsSeed.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

// Sessions ============================================

app.use(session({
  secret : 'bananasinpyjamas',
  resave : false,
  saveUninitialized : false
 }));
app.use(passport.initialize());
app.use(passport.session());

// Set up routes --- reading
app.get('/', readController.getAllPosts);
app.get('/users/:userid', readController.getByUser);
app.get('/posts/:postid', readController.getSinglePost);
app.get('/tags/:tag', readController.getByTag);

// Set up routes --- local registration/authentication
app.get('/signup', authController.signupForm);
app.post('/signup', passport.authenticate('localSignUp', {
  successRedirect: '/testsignedin',
  failureRedirect: '/signup'
}));

// Set up routes --- local signin
app.get('/signin', authController.signInIndex);
app.post('/signin', passport.authenticate('localSignIn', {
  successRedirect: '/testsignedin',
  failureRedirect: '/signin'
}));

// Set up routes --- Facebook authentication
app.get('/auth/facebook', passport.authenticate('fbSignIn'));
app.get('/auth/facebook/callback', passport.authenticate(
  'fbSignIn', {
    successRedirect: '/testsignedin',
    failureRedirect: '/signin'
}));

// Set up routes --- log out

app.get('/logout', authController.logout);

// Signed-in only routes
app.use(passportConfig.isLoggedIn);
app.get('/testsignedin', authController.getSignedIn);


var server = app.listen(9434, function() {
	console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
