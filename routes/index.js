var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Survey = require('../models/surveys');

// /* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Survey Says!?' });
// }



router.use(bodyParser.json({
  extended: true
}));
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
  Survey.find({}, function(err, surveys, count) {
    res.render('index', {
      surveys: surveys
    });
  });
});


module.exports = router;
