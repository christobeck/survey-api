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
var User = require('../models/users.js');
var auth = require('../authorization/auth');

app.use(passport.initialize());
app.use(passport.session());

app.get('/me', function(req, res) {
  console.log(req.user);
  res.json(req.user || {});
});

app.post('/login', bodyParser());
app.post('/login', jsonParser);
app.post('/login', passport.authenticate('login', {
  successRedirect: '/surveys',
  failureRedirect: '/surveys/login'
}));

app.post('/signup', bodyParser());
app.post('/signup', jsonParser);
app.post('/signup', passport.authenticate('signup', {}));



app.get('/logout', function(req, res) {
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

module.exports = app;
