var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  // 0 = admin, 1 = user
  permissions: {type: Number, default: 0},
  local: {
    username: String,
    password: String
  },
  facebook: {
    id    : String,
    token : String
  },
  email     : String,
  name      : String,
  bio       : String,
  avatarUrl : String,
  theme     : {type: String, default: 'default'}
});


userSchema.methods.generateHash = function(password, cb){
  bcrypt.genSalt(10, function(err, salt){
    if (err) console.log (err);
    bcrypt.hash(password, salt, function(err, hash){
      if (err) console.log (err);
      return cb(err, hash);
    });
  });
};

userSchema.methods.comparePassword = function(candidatePassword, next){
  // compare the encrypted password to the user-entered password
  bcrypt.compare(candidatePassword, this.local.password, function(err, isMatch){
    if(err){
      return next(err);
    }
    return next(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);