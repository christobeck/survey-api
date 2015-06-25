var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');



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
    required: true
  },
  surveyCreated: [{
    survey_id: "string"
  }],
  surveyResponded: [{
    survey_id: "string"
  }]
})

var loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
    autopopulate: true
  }
});

var User = mongoose.model('User', loginSchema)
module.exports = User;
