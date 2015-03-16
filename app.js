var express = require('express');
var paginate = require('express-paginate');
var bodyParser = require('body-parser');
var readController = require('./controllers/read.js');
var authController = require('./controllers/auth.js');
var adminController = require('./controllers/admin.js');
var _ = require('underscore');

// Dotenv to hide the good stuff
var dotenv = require('dotenv');
dotenv.load();

// Passport
var passport = require('passport');
var passportConfig = require('./config/passport.js');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

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
// Statically serve themes folder
app.use(express.static(__dirname + '/themes'));
app.use(bodyParser.urlencoded({extended: false}));

// Sessions ============================================

app.use(cookieParser());
app.use(flash());
app.use(session({
  secret : 'bananasinpyjamas',
  resave : false,
  saveUninitialized : false
 }));
app.use(passport.initialize());
app.use(passport.session());

// Pagination ==========================================

app.use(paginate.middleware(5,10));

// Routes ==============================================

// Set up routes --- reading
app.get('/', readController.getAllPosts);
app.get('/users/:userid', readController.getByUser);
app.get('/posts/:postid', readController.getSinglePost);
app.get('/tags/:tag', readController.getByTag);

// Set up routes --- local registration/authentication
app.get('/signup', authController.signupForm);
app.post('/signup', passport.authenticate('localSignUp', {
  successRedirect: '/admin',
  failureRedirect: '/signup',
  failureFlash: true
}));

// Set up routes --- local signin
app.get('/signin', authController.signInIndex);
app.post('/signin', passport.authenticate('localSignIn', {
  successRedirect: '/admin',
  failureRedirect: '/signin',
  failureFlash: true
}));

// Set up routes --- Facebook authentication
app.get('/auth/facebook', passport.authenticate('fbSignIn'));
app.get('/auth/facebook/callback', passport.authenticate(
  'fbSignIn', {
    successRedirect: '/admin',
    failureRedirect: '/signin'
}));

// Set up routes --- log out
app.get('/logout', authController.logout);

// Signed-in only routes
app.use(passportConfig.isLoggedIn);

// Try an if statement
// app.use(paginate.middleware(10,20));


// Set up routes --- admin backend
app.get('/admin', adminController.getAllPosts);
app.get('/admin/posts/create', adminController.createPost);
app.post('/admin/posts/create', adminController.saveNewPost);
app.get('/admin/posts/delete/:postid', adminController.deletePost);
app.get('/admin/posts/:postid', adminController.editPost);
app.post('/admin/posts/:postid', adminController.saveEditedPost);
app.get('/admin/profile', adminController.getProfile);
app.post('/admin/profile', adminController.saveProfile);
app.post('/admin/changepw', adminController.changePW);
// app.get('/admin/settings', adminController.editSettings);


var server = app.listen(process.env.PORT || 9434, function() {
	console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
