var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var credential = require('credential');


var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  surveyCreated: [{
    survey_id: "string"
  }],
  surveyResponded: [{
    survey_id: "string"
  }]
})

// var loginSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   userProfile: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'UserProfile',
//     autopopulate: true
//   }
// });

// userSchema.methods.setPassword = function(newPassword, next) {
//   credential.hash(newPassword, function(error, hash) {
//     if (error) {
//       return next(error);
//     } else {
//       this.password = hash;
//       this.save(next);
//     }
//   });
// };

// userSchema.methods.verifyPassword = function(testPasswrod, next) {
//   credential.verify(this.password, testPasswrod, done);
// };



// loginSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema)
module.exports = User;
