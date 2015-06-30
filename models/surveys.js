var mongoose = require('mongoose')

// a single possible answer to a question
var answerSchema = new mongoose.Schema({
  answer: {
    type: String
  },
  answered_users: {
    type: mongoose.Schema.Types.Mixed
  } //a hash of all the user id's who chose this answer to a given question.
});

// the range slider could be for cases of "on a scale from 1-5 etc.." where we don't need titles for specific answers.
var enumeratedInterfaceTypes = ["verticle", "horizontal", "range", "text"];

// a single question in a survey, with multiple possible answers
var promptSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  interfaceType: {
    type: String,
    enum: {
      values: enumeratedInterfaceTypes
    }
  },
  answers: [answerSchema],
  user_answers: []
});

var surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  questions: [promptSchema],
  answersPublic: {
    type: Boolean,
    default: false
  },
  activeThroughDate: {
    type: Date
  }, //set date when the survey is no longer editable
});

var Survey = mongoose.model('Survey', surveySchema);

// validate that a user cannot answer more than one question for a given answer
Survey.schema.path('questions').schema.path('answers').schema.path('answered_users').validate(function(features) {
  //1 create an array of all the user IDs
  //2 use forEach to iterate over all users and see if they already exist in the answers.answered_users hash for all the questions of the given survey
  //3. if so, flag this entry as invalid
})

module.exports = Survey;
