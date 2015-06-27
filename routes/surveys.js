var express = require('express');
var router = express.Router();
var Survey = require('../models/surveys');
var User = require('../models/users');
var session = require('client-sessions');

router.get('/', function(req, res) {
  Survey.find({}, function(err, surveys, count) {
    res.render('list', {
      surveys: surveys
    });

  });
});


// update this to reflect the survey model!
// router.post('/', function(req, res) {
//     new Survey({
//       name: req.body.fullname,
//       job: req.body.job,
//       nickname: req.body.nickname,
//       email: req.body.email
//     }).save(function(err, survey, count) {
//       if(err) {
//         res.status(400).send('Error saving new survey: ' + err);
//       } else {
//         res.send("New survey created");
//       }
//     })
// });
router.get('/login', function(req, res) {
  res.render('login', {
    title: "Survey Says"
  });
});
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var passport = require('../authorization/auth.js');
// app.use(passport.initialize());
// app.use(passport.session());

// router.post('/login', bodyParser());
// router.post('/login', jsonParser);
// router.post('/login', passport.authenticate('local', {
//   // successRedirect: '/',
//   // failureRedirect: '/signin'
// }), function(req, res) {
//   console.log()
//   var contact = req.body;
//   if (req.user != undefined) {
//     console.log(contact);
//     console.log(req.user.id)
//   }

//   res.end();
// });
// router.post('/login', passport.authenticate('local', {
//   // successRedirect: 'surveys/login',
//   // failureRedirect: '/signin'
// }));

router.get('/create', function(req, res) {
  res.render('create-survey', {});

  router.get('/add', function(req, res) {
    res.render('add', {
      survey: {}
    });
  });
})

router.route('/:survey_id')
  .all(function(req, res, next) {
    console.log(Survey.find());
    survey_id = req.params.survey_id;
    console.log(survey_id);
    console.log(req.params);
    survey = {};
    Survey.findById(survey_id, function(err, c) {
      survey = c;
      next();
    });
    console.log(survey);
  })


.get(function(req, res) {
  res.render('single', {
    survey: survey
  });
})

.post(function(req, res) {
  survey.notes.push({
    note: req.body.notes
  });

  survey.save(function(err, survey, count) {
    if (err) {
      res.status(400).send('Error adding note: ' + err);
    } else {
      res.send('Note added!');
    }
  });
})
// update this to reflect the survey model!
// .put(function(req, res) {
//   survey.name = req.body.fullname;
//   survey.job = req.body.job;
//   survey.nickname = req.body.nickname;
//   survey.email = req.body.email;

//   survey.save(function(err, survey, count) {
//     if(err) {
//       res.status(400).send('Error saving survey: ' + err);
//     } else {
//       res.send('Survey saved');
//     }
//   });
// })

.delete(function(req, res) {
  survey.remove(function(err, survey) {
    if (err) {
      res.status(400).send("Error removing survey: " + err);
    } else {
      res.send('Survey removed');
    }
  });
});

module.exports = router;
