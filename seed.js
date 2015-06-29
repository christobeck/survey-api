var User = require('./models/users.js');
var async = require('async');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/surveys");
var users = [];

users.push(function(done) {
  User.create({
    username: "Kinjal",
    password: "blah"
  }, done)
});

users.push(function(done) {
  User.create({
    username: "Charlton",
    password: "blahblah"
  }, done)
});;

async.series(users, function(err) {
  if (err) {
    console.log("error:" + err);
  }
  mongoose.disconnect();
});

// User.create({
//   username: "Kinjal",
//   password: "blah"
// });
// User.create({
//   username: "Charlton",
//   password: "blahblah"
// });
