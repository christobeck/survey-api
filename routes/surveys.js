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
    console.log("step1:" + survey_id);
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

.patch(function(req, res) {

  console.log(req.body.questions)
  //{"response_data":["Kinjal",[{"question_id":"558c56701ae5cd98098a5348","answers":{"answer_id":"558c56701ae5cd98098a5349"}},{"question_id":"558c56701ae5cd98098a5345","answers":{"answer_id":"558c56701ae5cd98098a5346"}}]]}
  res_questions = req.body.questions
  var json_questions = JSON.parse(res_questions);
  console.log("step2:" + json_questions);
  console.log("step2b:" + Object.keys(json_questions.response_data[1][0]));
  //[object Object]
  console.log("step3:" + json_questions.response_data);
  var response_array = json_questions.response_data[1];
  //Kinjal,[object Object],[object Object]
  console.log("step3b:" + json_questions.response_data[0]);
  var username = json_questions.response_data[0];
  var userId;
  User.findOne({
    'username': username
  }, function(err, user) {
    userId = user.id;
    console.log("step4:" + userId);
  })
  for (var i = 1; i < response_array.length; i++) {
    console.log("step4b" + response_array[i]);
    var response_question_id = response_array[i].question_id;
    console.log("step5:" +
      response_question_id);

    var response_answer_id = response_array[i].answers.answer_id;
    console.log(response_answer_id);
    var stored_questions_array = survey.questions
      // for (var j=0; j<stored_questions_array.length; j++ ){
      // if (stored_questions_array[i].id === response_question_id) {
      //   var stored_answers = stored_questions_array[i].answers;
      //   for (var k=0; k<store_answers.length;k++){
      //     if (stored_answers[k].id ===response_answer_id){

    //     }
    //   }
    //   }
    // }
    // Survey.update({
    //   _id: survey_id,
    //   "questions._id": response_question_id,
    //   "questions.answers._id": response_answer_id
    // }, {
    //   $set: {
    //     "questions.$.answers.$.answered_users": {
    //       username: true
    //     }
    //   },
    // }, {
    //   upsert: true
    // }, function(err) {
    //   console.log("step:nested array" + err)
    // })

    Survey.findById(survey_id, function(e, data) {
      if (e) {
        console.log(e);
      }
      data.questions.id(response_question_id).answers.id(response_answer_id).answered_users[userId] = true;
      console.log("step imp" + JSON.stringify(data));
      data.save();
    })
  }
  res.send('Survey answer saved');
})

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
