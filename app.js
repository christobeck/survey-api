var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/surveys");
// var jade = require('jade');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// var session = require('express-session');
// var MongoDBStore = require('connect-mongo')(session);
// var mongoStore = new MongodbStore({
//   uri: "mongodb://localhost/surveys",
//   collection: 'webSessions'
// });

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
// app.use(session({
//   store: new MongoStore({
//     uri: "mongodb://localhost/user",
//     collection: 'webSessions',
//     //
//     // resave: false,
//     // saveUninitialized: true
//   })
// }));

// if (config.env === 'production') {
//   app.set('trust proxy', 1);
// }
// app.use(session({

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


///// Trial starts here
// var path = require('path');
// var express = require('express');
// var http = require('http');
// var mongoose = require('mongoose');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// var app = express();
// app.set('port', process.env.PORT || 3000);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.set('view options', {
//   layout: false
// });
// app.configure(function() {
//   app.use(express.static('public'));
//   app.use(express.cookieParser());
//   app.use(express.bodyParser());
//   app.use(express.session({
//     secret: 'keyboard cat'
//   }));
//   app.use(passport.initialize());
//   app.use(passport.session());
//   app.use(app.router);
// });
// app.use(express.logger());
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// // app.use(express.cookieParser('your secret here'));
// // app.use(express.session());
// // app.use(passport.initialize());
// // app.use(passport.session());
// // app.use(app.router);
// // app.use(express.static(path.join(__dirname, 'public')));

// // app.configure('development', function() {
// //   app.use(express.errorHandler({
// //     dumpExceptions: true,
// //     showStack: true
// //   }));
// // });

// // app.configure('production', function() {
// //   app.use(express.errorHandler());
// // });

// // passport config
// var User = require('./models/users.js');
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

// // mongoose
// mongoose.connect('mongodb://localhost/surveys');

// // routes
// require('./routes')(app);

// app.listen(app.get('port'), function() {
//   console.log(("Express server listening on port " + app.get('port')))
// });
