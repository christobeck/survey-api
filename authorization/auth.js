var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var util = require('util');
var bCrypt = require('bcrypt');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var morgan = require('morgan');
var jade = require('jade');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users.js');;

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    findOrCreateUser = function() {
      // find a user in Mongo with provided username
      User.findOne({
        'username': username
      }, function(err, user) {
        // In case of any error return
        if (err) {
          console.log('Error in SignUp: ' + err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');
          return done(null, false,
            req.flash('message', 'User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = req.param('email');
          newUser.firstName = req.param('firstName');
          newUser.lastName = req.param('lastName');

          // save the user
          newUser.save(function(err) {
            if (err) {
              console.log('Error in Saving user: ' + err);
              throw err;
            }
            console.log('User Registration succesful');
            return done(null, newUser);
          });
        }
      });
    };

    // Delay the execution of findOrCreateUser and execute
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  }));
var createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};



passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    // check in mongo if a user with username exists or not
    User.findOne({
        'username': username
      },
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user) {
          console.log('User Not Found with username ' + username);
          return done(null, false,
            req.flash('message', 'User Not found.'));
        }
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)) {
          console.log('Invalid Password');
          return done(null, false,
            req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      }
    );
  }));
var isValidPassword = function(user, password) {
  return bCrypt.compareSync(password, user.password);
}

passport.serializeUser(function(user, done) {
  console.log('serializing user: %j', user);
  console.log('result is %j', user.username);
  done(null, user.id);

});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(error, user) {
    console.log('deserializing user: %j', user);
    // console.log('result is %j', user);
    done(error, user);
  });
});
module.exports = passport;
