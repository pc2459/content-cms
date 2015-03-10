var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  // 0 = admin, 1 = user
  permissions: {type: Number, default: 0},
  local: {
    email: 
      { 
        type    : String,
        unique  : true
      },
    password:
      {
        type    : String
      }
  },
  facebook: {
    id    : String,
    email : String
  },
  name      : String,
  bio       : String,
  avatarUrl : String
});

// userSchema.pre('save', function(next){
//   // check if this is a new password
//   if(!this.isModified('password')){
//     return next();
//   }

//   // encrypt the password
//   var user = this;
//   bcrypt.genSalt(10, function(err, salt){
//     if(err){
//       return next(err);
//     }

//     bcrypt.hash(user.password, salt, function(err, hash){
//       if(err){
//         return next(err);
//       }

//       user.password = hash;
//       next();
//     });
//   });
// });

userSchema.methods.generateHash = function(password){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){
      return hash;
    });
  });
};

userSchema.methods.comparePassword = function(candidatePassword, next){
  // compare the encrypted password to the user-entered password
  bcrypt.compare(candidatePassword, this.local.password, function(err, isMatch){
    if(err){
      return next(err);
    }
    next(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);