// server.js

// modules =====================================================
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var morgan = require('morgan');


// configuration ===============================================
var settings = require('./config/settings');

// app =========================================================
var app = express();

app.set('superSecret', settings.secret);

// setup db connection settings
mongoose.connect(settings.dbUrl);

// set our port
var port = 8080; //process.env.PORT || 8080;

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// use morgan to log requests to the console
app.use(morgan('dev'));

// set the static files location for public
app.use(express.static(__dirname + '/public'));

// routes ======================================================
require('./app/routes')(app);

// start app ===================================================
app.listen(port); // startup our app at http://localhost:8080

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;