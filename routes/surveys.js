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
}));
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
  Survey.find({}, function(err, surveys, count) {
    res.render('list', {
      surveys: surveys
    });
  });
});


router.post('/', function(req, res) {
  new Survey({
    title: req.body.title,
    url: req.body.url,
    questions: req.body.questions
  }).save(function(err, survey, count) {
    if(err) {
      res.status(400).send('Error saving new survey: ' + err);
    } else {
      res.json(survey);
    }

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





// checks if entered survey url is already taken
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
  });


// route to the actual survey that was created
router.route('/:survey_url')
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
      res.render('single', survey);
    }else{
      res.render('not-found');
    }
  });



// get those results
router.route('/:survey_url/results')
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
      res.render('results', survey);
    }else{
      res.render('not-found');
    }
  });

// Get survey by ID
router.route('/:survey_id')
  .all(function(req, res, next) {
    survey_id = req.params.survey_id;
    survey = {};
    Survey.findById(survey_id, function(err, c) {
      survey = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('single', {survey: survey});
  })

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

  // .delete(function(req, res) {
  //   survey.remove(function(err, survey) {
  //     if(err) {
  //       res.status(400).send("Error removing survey: " + err);
  //     } else {
  //       res.send('Survey removed');
  //     }
  //   });
  // });




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
