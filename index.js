var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

app = express(); //create an instance of an express application
mongoose.connect('mongodb://localhost/wdi');
jsonParser = bodyParser.json();
