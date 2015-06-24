var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
// var Survey = require('./models/surveys.js');
var util = require('util');
var routes = require('./routes/index');
var surveys = require('./routes/surveys');
// var apiRouter = express.Router();

var jade = require('jade');
var fs = require('fs');

// we set our view engine here
app.set('view engine', 'jade');
app.set('views', './views');

var MongoURI = process.env.MONGO_URI || 'mongodb://localhost/surveys';
mongoose.connect(MongoURI, function(err, res) {
    if(err) {
        console.log('ERROR connecting to: ' + MongoURI + '. ' + err);
    } else {
        console.log('MongoDB connected successfully to ' + MongoURI);
    }
});

// here we mount the apiRouter onto our instance of express
app.use('/', routes);
app.use('/surveys/', surveys);

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
