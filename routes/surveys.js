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

router.get('/me', function(req, res) {
  console.log('ME: ' + req.user);
  res.json(req.user || {});
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
  console.log("user session: " + req.user);
  console.log("body: " + req.body && req.body.questions)
  //{"response_data":["Kinjal",[{"question_id":"558c56701ae5cd98098a5348","answers":{"answer_id":"558c56701ae5cd98098a5349"}},{"question_id":"558c56701ae5cd98098a5345","answers":{"answer_id":"558c56701ae5cd98098a5346"}}]]}
  if (req.user && req.user.id) {
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
    var userId = req.user.id;
    console.log("step4: user Id:" + userId)

    for (var i = 1; i < response_array.length; i++) {
      console.log("step4b" + response_array[i]);
      var response_question_id = response_array[i].question_id;
      console.log("step5:" +
        response_question_id);

      var response_answer_id = response_array[i].answers.answer_id;
      console.log("step6:" + response_answer_id);
      var response_answer_val = response_array[i].answers.answer_type;
      console.log("step7:" + response_answer_val);
      var stored_questions_array = survey.questions

      // Survey.findById(survey_id, function(e, data) {
      //   if (e) {
      //     console.log(e);
      //   }
      //   data.questions.id(response_question_id).answers.id(response_answer_id).answered_users[userId] = true;
      //   // console.log("step imp" + JSON.stringify(data));
      //   data.markModified('questions.answers');
      //   data.save(function(err, survey) {
      //     console.log(err);
      //     console.log(survey.questions.id(response_question_id).answers.id(response_answer_id).answered_users[userId]);
      //     res.send(survey);
      //   });
      // data.questions.id(response_question_id).answers.id(response_answer_id).answered_users[userId] = response_answer_val;
      // console.log("step imp2 :" + JSON.stringify(data));
      // data.save();

      Survey.update({
        _id: survey_id,
        "questions._id": response_question_id
      }, {
        $push: {
          "questions.$.user_answers": response_answer_id
        }
      }, function(err, survey) {
        console.log(err);

      })
    }


  }
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

router.route('/:survey_id/results')
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
// console.log("step2: ques  " + surveys.questions);
.get(function(req, res) {
  var survey_result = [];
  for (var i = 0; i < survey.questions.length; i++) {

    console.log("step2: ques length " + survey.questions.length);
    var stored_ans = survey.questions[i].answers;
    console.log("step3: " + stored_ans);
    var answers = []

    for (var j = 0; j < stored_ans.length; j++) {

      var ans_id = stored_ans[j].id;
      console.log("step4: " + ans_id);
      var ans_user_array = survey.questions[i].user_answers
      console.log("step5: " + ans_user_array);
      var question_title = survey.questions[i].question;
      var count = 0;
      console.log("step6: outside count check:" + count)
      for (var k = 0; k < ans_user_array.length; k++) {
        console.log(ans_user_array[k]);
        if (ans_user_array[k] === ans_id) {
          count += 1;
          console.log("step7 inside count check:" + count);
        }

      }
      console.log("step6: after count check:" + count)
      answers.push({
        answer_title: stored_ans[j].answer,
        count: count
      })
      console.log("step6:answers:" + JSON.stringify(answers));
    }
    survey_result.push({
      question_title: question_title,
      answers: answers
    });
  }

  console.log("step7:result:" + JSON.stringify(survey_result));
  console.log("step8:ques:" + survey_result[0].answers);
  console.log("step9:ans:" + survey_result[1].question_title);
  res.json(survey_result)
})




// for (var i = 1; i < response_array.length; i++) {
//    console.log("step4b" + response_array[i]);        console.log("step4b" + response_array[i]);
//    var response_question_id = response_array[i].question_id;         var response_question_id = response_array[i].question_id;
//    console.log("step5:" +        console.log("step5:" +
//      response_question_id);          response_question_id);

//    var response_answer_id = response_array[i].answers.answer_id;         var response_answer_id = response_array[i].answers.answer_id;
//    console.log(response_answer_id);        console.log(response_answer_id);
//    var stored_questions_array = survey.questions         var stored_questions_array = survey.questions
//      // for (var j=0; j<stored_questions_array.length; j++ ){          // for (var j=0; j<stored_questions_array.length; j++ ){
//      // if (stored_questions_array[i].id === response_question_id) {           // if (stored_questions_array[i].id === response_question_id) {
//      //   var stored_answers = stored_questions_array[i].answers;          //   var stored_answers = stored_questions_array[i].answers;
//      //   for (var k=0; k<store_answers.length;k++){           //   for (var k=0; k<store_answers.length;k++){
//      //     if (stored_answers[k].id ===response_answer_id){           //     if (stored_answers[k].id ===response_answer_id){

//    //     }        //     }
//    //   }        //   }
//    //   }        //   }
//    // }        // }


module.exports = router;
