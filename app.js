var express = require('express');
var bodyParser = require('body-parser');
var readController = require('./controllers/read.js');
var _ = require('underscore');

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

// Set up routes --- reading
app.get('/', readController.index);
app.get('/:userid', readController.getByUser)

var server = app.listen(9434, function() {
	console.log('Express server listening on port ' + server.address().port);
});
