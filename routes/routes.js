var passport = require('passport');

app.post('/local-register',
  ///create user here
  ///this function just logs in created user
  req.login(user, function(err) {
    if (err) {
      return next(err);
    }
    return res.redirect('/users/' + req.user.username);
  }));



app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));


app.get('/logout', function(req, res) {
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});
