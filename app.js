var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/user");
// var jade = require('jade');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// var session = require('express-session');
// var MongoSessionDB = require('connect-mongodb-session')(session);
// var mongoStore = new MongoSessionDB({
//   uri: config.mongo.dbUrl,
//   collection: 'webSessions'
// });

// if (config.env === 'production') {
//   app.set('trust proxy', 1);
// }

// app.use(session({
//   store: mongoStore,
//   secret: config.secrets.SESSION_KEY,
//   cookie: config.cookieOptions,
//   resave: false,
//   saveUninitialized: true
// }));
// authentication

var passport = require('./authorization/auth.js');
app.use(passport.initialize());
app.use(passport.session());

// AuthStrategy = require('passport-local').Strategy;
// passport.use(new AuthStrategy({
//     clientID: config.secrets.GITHUB_CLIENT_ID,
//     clientSecret: config.secrets.GITHUB_CLIENT_SECRET,
//     callbackURL: config.authCallbackUrl,
//     profile: true
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOneAndUpdate({
//       githubId: profile.id
//     }, {
//       rawProfile: profile,
//       username: profile.username,
//       displayName: profile.displayName,
//       email: profile.emails[0].value,
//       lastLogin: Date.now()
//     }, {
//       upsert: true,
//       new: true
//     }, function(err, response) {
//       console.log(response);
//       done(err, response);
//     });
//   }

// ));

// app.post('/local-register',
//   ///create user here
//   ///this function just logs in created user
//   req.login(user, function(err) {
//     if (err) {
//       return next(err);
//     }
//     return res.redirect('/users/' + req.user.username);
//   }));
app.post('/login', jsonParser);
app.post('/login', passport.authenticate('local', {
  // successRedirect: '/',
  // failureRedirect: '/signin'

}), function(req, res) {
  var contact = res.body;
  // console.log(res)
  console.log(contact);
  res.end();
});


app.get('/logout', function(req, res) {
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
