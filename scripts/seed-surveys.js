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
        title: "test survey-with text",
        url: "test-survey",
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
            answer: "ok",
            answered_users: {
              1: true,
              2: true,
              3: true
            }
          }, {
            answer: "best",
            answered_users: {
              1: true,
              2: true,
              3: true
            }
          }]
        }, {
          question: "what about this page?",
          interfaceType: "text",
          answers: [{
            answer: "its text",
          }]
        }]
      }, done);
    },

    function(done) {
      Survey.create({
        title: "test survey-2",
        url: "test-survey-2",
        questions: [{
          question: "what do you think about this one?",
          answers: [{
            answer: "Awesome",
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
          question: "what about this other thing?",
          answers: [{
            answer: "not too bad",
            answered_users: {
              1: true,
              2: true,
              3: true
            }
          }, {
            answer: "its fine",
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
        title: "test survey-3",
        url: "test-survey-3",
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
