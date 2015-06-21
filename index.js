var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express(); //create an instance of an express application
var Survey = require('./lib/surveySchema.js');
var util = require('util');
var apiRouter = express.Router();

var jade = require('jade');
var fs = require('fs');


// we set our view engine here
app.set('view engine', 'jade');
app.set('views', './templates');



mongoose.connect('mongodb://localhost/surveys');
var jsonParser = bodyParser.json();


app.get('/surveys', function(req, res) {
  Survey.find({}, function(error, surveyList) {
    res.json(surveyList);
  });
});

app.get('/surveys/:id', function(req, res) {
  Survey.find({
    _id: req.params.id
  }, function(error, survey) {
    res.json(survey);
  });
});

app.post('/surveys', jsonParser);
app.post('/surveys', function(req, res) {
  Survey.create(req.body, function(error, survey) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  });
});

app.put('/surveys/:id', jsonParser);
app.put('/surveys/:id', function(req, res) {
  Survey.findByIdAndUpdate(req.params.id, req.body, function(error, survey) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
});

app.patch('/surveys/:id', jsonParser);
app.patch('/surveys/:id', function(req, res) {
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

app.delete('/surveys/:id', function(req, res) {
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

// here we mount the apiRouter onto our instance of express
app.use('/api', apiRouter);
app.get('/', function(req, res){
  res.render( 'index', {title: "you got surved"});
});

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
