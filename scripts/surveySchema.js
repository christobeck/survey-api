var mongoose = require('mongoose')

var answerSchema = new mongoose.Schema({
  title:{},
});

var promptSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    enum: {
      values: enumeratedContactTypes
    }
  },
  range:{}, //
  answers:[answerSchema]
})


var surveySchema = new mongoose.Schema({

});

var Survey = mongoose.model('Question', contactSchema);


module.exports = Survey;

