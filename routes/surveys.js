var express = require('express');
var app = express();
var router = express.Router();
var Survey = require('../models/surveys');
var User = require('../models/users');
var session = require('client-sessions');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
router.use(bodyParser.json({
  extended: true
}))
router.use(bodyParser.urlencoded({
  extended: false
}))
router.use(bodyParser.json());

router.get('/', function(req, res) {
  Survey.find({}, function(err, surveys, count) {
    res.render('list', {
      surveys: surveys
    });

  });
});


router.get('/login', function(req, res) {
  res.render('login', {
    title: "Survey Says"
  });
});

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
    survey_id = req.params.survey_id;
    console.log(survey_id);
    survey = {};
    Survey.findById(survey_id, function(err, c) {
      survey = c;
      next();
    });
    // console.log(survey);
  })


.get(function(req, res) {
  res.render('single', {
    survey: survey
  });
})



// survey.save(function(err, survey, count) {
//   if (err) {
//     res.status(400).send('Error adding note: ' + err);
//   } else {
//     res.send('Note added!');
//   }
// })
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
