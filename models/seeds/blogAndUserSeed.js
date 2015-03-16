var Blog = require('../blog.js');
var User = require('../user.js');

// Seed up one blog
Blog.find({}, function(err, results){
  
  if(results.length === 0){
  
    var newBlog = new Blog({
      registrationOpen : true
    });

    newBlog.save();

  }
});

// Seed up an administrator level user
User.find({}, function(err, results){
  
  if(results.length === 0){
  
    var newUser = new User({
      name: 'Fo',
      bio: 'The developer behind this madness'
    });

    newUser.save();

  }
});
