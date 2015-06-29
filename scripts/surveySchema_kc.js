var mongoose = require('mongoose');

// This Schema is for generating/storing Survey questions for each survey.
/// To put it in rails language --- each survey will have many questions and options. Each question will be according to question Schema.

//// The responses can be stored in a seperate collection with included survey id
enumeratedOptionTypes = [boolean, range] //more can be added here

// For each question the options given for an
var optionSchema = new mongoose.Schema({
  optionType: {
    type: String,
    required: true,
    enum: {
      values: enumeratedOptionTypes
    }
  },
  ///I still need to figure out how to include more answers here :(
  answerType: {
    type: String,
    required: true,
  }
})

var questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: optionSchema

})


var survey = new mongoose.Schema({
  questions: [questionSchema],
  responses: [responseSchema]
});

module.exports = Survey;
