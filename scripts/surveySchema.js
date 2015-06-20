var mongoose = require('mongoose')

// a single possible answer to a question
var answerSchema = new mongoose.Schema({
  title:{}, //maybe there's a more semantic word than 'title'.
  answered_users:[] //an array of all the user id's who chose this answer to a given question.
});

// just some ideas here for choosing different interfaces for each question.
// the range slider could be for cases of "on a scale from 1-5 etc.." where we don't need titles for specific answers.
var enumeratedInterfaceTypes = ["verticle-buttons", "horizontal-buttons", "range-slider"];

// a single question in a survey, with multiple possible answers
var promptSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    enum: {
      values: enumeratedInterfaceTypes
    }
  },
  answers:[answerSchema] //
})

//
var surveySchema = new mongoose.Schema({
  questions:[promptSchema],
  answersPublic: {
    type:Boolean,
    default: false
  },
  // creator_id: Schema.Types.ObjectId,  Not sure if this is the right syntax, need to research storing a user object's ID in another collection
  activeThroughDate:{type:Date}, //set date when the survey is no longer editable

});

var Survey = mongoose.model('Question', surveySchema);


module.exports = Survey;

