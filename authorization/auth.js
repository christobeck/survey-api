var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/users.js');
var session = require('client-sessions');

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    console.log(password);
    User.findOne({
      username: username,
      password: password
    }, function(err, user) {
      if (err) {
        console.log(err);
        return done(err);
      } else if (!user) {
        console.log("no user");
        return done(null, false)
      } else {
        console.log("found it")
        return done(null, user)
      }
    });
  }));

passport.serializeUser(function(user, done) {
  console.log('serializing user: %j', user);
  console.log('result is %j', user.name);
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  User.find({
    username: user.name
  }, function(error, user) {
    console.log('deserializing user: %j', user);
    console.log('result is %j', user);
    done(error, user);
  });
});

module.exports = passport;
