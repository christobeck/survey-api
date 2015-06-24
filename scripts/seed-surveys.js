var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/surveys');

var Survey = require('../models/surveys.js');

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
            answered_users: {1:true, 2:true, 3:true}
          }, {
            answer: "its good",
            answered_users: {1:true, 2:true, 3:true}
          }]
        }, {
          question: "what about this thing?",
          answers: [{
            answer: "its good",
            answered_users: {1:true, 2:true, 3:true}
          }, {
            answer: "its bad",
            answered_users: {1:true, 2:true, 3:true}
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
