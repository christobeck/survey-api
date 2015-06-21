var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express(); //create an instance of an express application
var Survey = require('./lib/surveySchema.js');
var util = require('util');
var apiRouter = express.Router();


mongoose.connect('mongodb://localhost/surveys');
var jsonParser = bodyParser.json();


apiRouter.get('/surveys', function(req, res) {
  Survey.find({}, function(error, surveyList) {
    res.json(surveyList);
  });
});

apiRouter.get('/surveys/:id', function(req, res) {
  Survey.find({
    _id: req.params.id
  }, function(error, survey) {
    res.json(survey);
  });
});

apiRouter.post('/surveys', jsonParser);
apiRouter.post('/surveys', function(req, res) {
  Survey.create(req.body, function(error, survey) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  });
});

apiRouter.put('/surveys/:id', jsonParser);
apiRouter.put('/surveys/:id', function(req, res) {
  Survey.findByIdAndUpdate(req.params.id, req.body, function(error, survey) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

apiRouter.patch('/surveys/:id', jsonParser);
apiRouter.patch('/surveys/:id', function(req, res) {
  Survey.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, function(error, survey) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

apiRouter.delete('/surveys/:id', function(req, res) {
  Survey.remove({
    _id: req.params.id
  }, function(error) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});


var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
