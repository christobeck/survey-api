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
        url: "test-survey",
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
    },
    function(done) {
      Survey.create({
        title: "test survey-2",
        url: "test-survey-2",
        questions: [{
          question: "what do you think about this?",
          answers: [{
            answer: "its good",
            answered_users: {
              1: true,
              2: true,
              3: true
            }
          }, {
            answer: "its horrible",
            answered_users: {
              1: true,
              2: true,
              3: true
            }
          }]
        }, {
          question: "what about this thing?",
          answers: [{
            answer: "not too bad",
            answered_users: {
              1: true,
              2: true,
              3: true
            }
          }, {
            answer: "excellent",
            answered_users: {
              1: true,
              2: true,
              3: true
            }
          }]
        }]
      }, done);
    },
    function(done) {
      Survey.create({
        title: "test survey-2",
        questions: [{
          question: "what do you think about the product?",
          answers: [{
            answer: "could be better",
            answered_users: {
              1: true,
              2: true,
              3: true
            }
          }, {
            answer: "better than the best",
            answered_users: {
              1: true,
              2: true,
              3: true
            }
          }]
        }, {
          question: "what abt this one",
          answers: [{
            answer: "nope",
            answered_users: {
              1: true,
              2: true,
              3: true
            }
          }, {
            answer: "not at all",
            answered_users: {
              1: true,
              2: true,
              3: true
            }
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
