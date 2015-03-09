
var Post = require('../post.js');
var _ = require('underscore');

// Dummy posts
var dummyPosts = [
  { 
    title: 'Captain Planet Is A Troll',
    body: 'Captain Planet is totally a troll. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis omnis quasi laudantium unde aut consequuntur, quidem eius, placeat totam dolore optio soluta ab quaerat officia aliquam quae voluptatum cum atque.',
    owner: '54fe2495d16adbbf824ccad9',
    ownerName: 'Fo',
    tags: ['node.js', 'javascript'],
    published: 1
  },

  { 
    title: 'Superuser Capabilities Render Poetry Useless',
    body: 'Ut nunc. Taciti facilisi vitae pretium mi magnis non Ad nec mus egestas egestas aliquet ligula pharetra dignissim nam, taciti vulputate velit euismod aliquam placerat molestie ridiculus.Cursus suspendisse sagittis facilisis potenti hac hymenaeos euismod blandit, adipiscing hendrerit fusce sed vel class condimentum vivamus ad vivamus cursus tempus ridiculus. Nullam arcu aptent. Gravida interdum elit, fringilla turpis, amet phasellus non vel volutpat fusce. Netus hymenaeos ligula, purus hac varius nec praesent. Volutpat integer nam, eros vivamus hendrerit tincidunt penatibus turpis venenatis ridiculus Tristique volutpat mattis quam facilisis posuere, rutrum viverra sodales ipsum ut ad tempus potenti nec maecenas odio, metus.',
    owner: '54fe2495d16adbbf824ccad9',
    ownerName: 'Fo',
    tags: ['node.js'],
    published: 1
  },

  { 
    title: 'I Conditionally Sing Interpol Lyrics',
    body: 'Ut nunc. Taciti facilisi vitae pretium mi magnis non Ad nec mus egestas egestas aliquet ligula pharetra dignissim nam, taciti vulputate velit euismod aliquam placerat molestie ridiculus.Cursus suspendisse sagittis facilisis potenti hac hymenaeos euismod blandit, adipiscing hendrerit fusce sed vel class condimentum vivamus ad vivamus cursus tempus ridiculus. Nullam arcu aptent. Gravida interdum elit, fringilla turpis, amet phasellus non vel volutpat fusce. Netus hymenaeos ligula, purus hac varius nec praesent. Volutpat integer nam, eros vivamus hendrerit tincidunt penatibus turpis venenatis ridiculus Tristique volutpat mattis quam facilisis posuere, rutrum viverra sodales ipsum ut ad tempus potenti nec maecenas odio, metus.',
    owner: '54fe2495d16adbbf824ccad9',
    ownerName: 'Fo',
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

