var express = require('express');
var router = express.Router();
var Survey = require('../models/surveys');

router.get('/', function(req, res) {
  Survey.find( function(err, surveys, count) {
    res.render('list', {surveys: surveys});
  })
});

// update this to reflect the survey model!
router.post('/', function(req, res) {
    new Survey({
      title: req.body.title,
      url: req.body.url,
      questions: req.body.questions
    }).save(function(err, survey, count) {
      if(err) {
        res.status(400).send('Error saving new survey: ' + err);
      } else {
        res.send("New survey created");
      }
    })
});

router.get('/create', function(req, res) {
  res.render('create-survey', {});
});


router.route('/validate/:survey_url')
  .all(function(req, res, next) {
    survey_url = req.params.survey_url;
    survey = {};
    Survey.findOne({'url' : survey_url}, function(err, s){
      survey = s;
      next();
    });
  })
  .get(function(req, res) {
    if(survey){
      res.json({available: false});
    }else{
      res.json({available: true});
    }

  })

// router.route('/:survey_id')
//   .all(function(req, res, next) {
//     survey_id = req.params.survey_id;
//     survey = {};
//     Survey.findById(survey_id, function(err, c) {
//       survey = c;
//       next();
//     });
//   })

//   .get(function(req, res) {
//     res.render('single', {survey: survey});
//   })

//   .post(function(req, res) {
//     // Survey.create(req.body, function(error, contact) {
//     //   if (error) {
//     //     console.log(error);
//     //     res.sendStatus(400);
//     //   } else {
//     //     res.sendStatus(201);
//     //   }
//     });

//     survey.save(function(err, survey, count) {
//       if(err) {
//         res.status(400).send('Error: ' + err);
//       } else {
//         res.send('survey added!');
//       }
//     });
//   })
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

  // .delete(function(req, res) {
  //   survey.remove(function(err, survey) {
  //     if(err) {
  //       res.status(400).send("Error removing survey: " + err);
  //     } else {
  //       res.send('Survey removed');
  //     }
  //   });
  // });

module.exports = router;
