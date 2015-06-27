var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
// mongoose.set('debug', true);
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
// var Survey = require('./models/surveys.js');
var util = require('util');
var routes = require('./routes/index');
var surveys = require('./routes/surveys');
// var apiRouter = express.Router();

var jade = require('jade');
var fs = require('fs');

var session = require('client-sessions');
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
// we set our view engine here
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('views', './views');

var MongoURI = process.env.MONGO_URI || 'mongodb://localhost/surveys';
mongoose.connect(MongoURI, function(err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + MongoURI + '. ' + err);
  } else {
    console.log('MongoDB connected successfully to ' + MongoURI);
  }
});

// here we mount the apiRouter onto our instance of express
app.use('/', routes);
app.use('/surveys/', surveys);

app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('./authorization/auth.js');
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', bodyParser());
app.post('/login', jsonParser);
app.post('/login', passport.authenticate('local', {
  // successRedirect: '/',
  // failureRedirect: '/signin'
}), function(req, res) {
  console.log()
  var contact = req.body;
  if (req.user != undefined) {
    console.log(contact);
    console.log(req.user.id)
  }

  res.end();
});

// app.get('/logout', function(req, res) {
//   var name = req.user.username;
//   console.log("LOGGIN OUT " + req.user.username)
//   req.logout();
//   res.redirect('/');
//   req.session.notice = "You have successfully been logged out " + name + "!";
// });


var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
