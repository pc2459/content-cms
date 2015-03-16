var Blog = require('../blog.js');
var User = require('../user.js');
var Post = require('../post.js');
var _ = require('underscore');

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

    newUser.generateHash('test', function(err, hash){

      newUser.local.password = hash;
      newUser.local.username = 'fo';
      newUser.email = 'test@test.com';
      newUser.name = 'Fo';
      newUser.bio = 'The developer behind this madness.';
      newUser.permissions = 1;

      newUser.save(function(err, user){

        // Dummy posts
        var dummyPosts = [
          { 
            title: 'Captain Planet Is A Troll',
            body: '<blockquote>Captain Planet is totally a troll. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</blockquote> Perspiciatis omnis quasi laudantium unde aut consequuntur, quidem eius, placeat totam dolore optio soluta ab quaerat officia aliquam quae voluptatum cum atque.',
            owner: user._id,
            ownerName: user.name,
            tags: ['node.js', 'javascript'],
            published: 1
          },

          { 
            title: 'Superuser Capabilities Render Poetry Useless',
            body: '<b>Ut nunc.</b> Taciti facilisi vitae pretium mi magnis non Ad nec mus egestas egestas aliquet ligula pharetra dignissim nam, taciti vulputate velit euismod aliquam placerat molestie ridiculus.Cursus suspendisse sagittis facilisis potenti hac hymenaeos euismod blandit, adipiscing hendrerit fusce sed vel class condimentum vivamus ad vivamus cursus tempus ridiculus. Nullam arcu aptent. Gravida interdum elit, fringilla turpis, amet phasellus non vel volutpat fusce. Netus hymenaeos ligula, purus hac varius nec praesent. Volutpat integer nam, eros vivamus hendrerit tincidunt penatibus turpis venenatis ridiculus Tristique volutpat mattis quam facilisis posuere, rutrum viverra sodales ipsum ut ad tempus potenti nec maecenas odio, metus.',
            owner: user._id,
            ownerName: user.name,
            tags: ['node.js'],
            published: 1
          },

          { 
            title: 'I Conditionally Sing Interpol Lyrics',
            body: 'Ut nunc. Taciti facilisi vitae pretium mi magnis non Ad nec mus egestas egestas aliquet ligula pharetra dignissim nam, taciti vulputate velit euismod aliquam placerat molestie ridiculus.Cursus suspendisse sagittis facilisis potenti hac hymenaeos euismod blandit, adipiscing hendrerit fusce sed vel class condimentum vivamus ad vivamus cursus tempus ridiculus. Nullam arcu aptent. Gravida interdum elit, fringilla turpis, amet phasellus non vel volutpat fusce. Netus hymenaeos ligula, purus hac varius nec praesent. Volutpat integer nam, eros vivamus hendrerit tincidunt penatibus turpis venenatis ridiculus Tristique volutpat mattis quam facilisis posuere, rutrum viverra sodales ipsum ut ad tempus potenti nec maecenas odio, metus.',
            owner: user._id,
            ownerName: user.name,
            tags: ['lyrics'],
            published: 1
          }

        ];

        // Seed up dummy posts
        Post.find({}, function(err, results){
          
          if(results.length === 0){

            _.each(dummyPosts, function(post){
              var newPost = new Post(post);
              newPost.save();
            });
          
          }
        });



      });


    });


  }
});
