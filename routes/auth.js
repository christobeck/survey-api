var passport = require('passport');
var expressSession = require('express-session');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  // Display the Login page with any flash message, if any
  res.render('login', {
    message: req.flash('message')
  });
});

/* Handle Login POST */
router.post('/', passport.authenticate('login', {
  successRedirect: '/home',
  failureRedirect: '/',
  failureFlash: true
}));

/* GET Registration Page */
router.get('/signup', function(req, res) {
  res.render('register', {
    message: req.flash('message')
  });
});

/* Handle Registration POST */
router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/home',
  failureRedirect: '/signup',
  failureFlash: true
}));

module.exports = router
