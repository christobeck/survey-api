var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/surveys');

var Survey = require('../lib/surveySchema.js');

async.series([

    // first: clean everything out of the contacts collection

    function(done) {
      Survey.remove({}, done);
    },

    function(done) {
      Survey.create({
        title: "test survey",
        questions: [{
          question: "what do you think about this?",
          answers: [{
            answer: "its good",
            answered_users: [1, 2, 3]
          }, {
            answer: "its good",
            answered_users: [4, 5, 6]
          }]
        }, {
          question: "what about this thing?",
          answers: [{
            answer: "its good",
            answered_users: [1, 2, 3]
          }, {
            answer: "its bad",
            answered_users: [4, 5, 6]
          }]
        }]
      }, done);
    }
  ],

  function(error) {
    if (error) {
      console.error(error);
    }
    mongoose.disconnect();
  }
);
