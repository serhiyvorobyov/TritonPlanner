/**
 * Created by Seiji on 1/28/2016.
 */
'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var requirements = require('./routes/requirements');
var course_display = require('./routes/course-display');
var course_description = require('./routes/course-description');
var field_listing = require('./routes/field-listing');

var app = express();



// all environment
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Add routes here
app.get('/', index.view);
app.get('/requirements', requirements.view);
app.get('/courses', course_display.view);
app.get('/course-description', course_description.view);
app.get('/field-listing', field_listing.view);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});