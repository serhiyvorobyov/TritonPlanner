/**
 * Created by Seiji on 1/28/2016.
 */
'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

// Custom Handlebar Helpers
handlebars = handlebars.create({
    helpers: {
        ifThird: function( index, options ) {
            if( index%3 == 2 ){
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    }
});

var index = require('./routes/index');
var requirements = require('./routes/requirements');
var course_listing = require('./routes/course-listing');
var course_description = require('./routes/course-description');
var department_listing = require('./routes/department-listing');
var login = require('./routes/login');
var add_class = require('./routes/add-class');
var show_quarter = require('./routes/show-quarter');

var app = express();

// all environment
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine);
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
//app.get('/', login.view);
app.get('/parts/course-description/:course', course_description.view);
app.get('/parts/department-listing-view', department_listing.view);
app.get('/parts/requirements-view', requirements.view);
app.get('/parts/planner-view', index.calendar);
app.get('/parts/course-listing/:department', course_listing.mgt);
app.get('/parts/choose-quarter/:choosenClass', index.chooseQuarter);
app.get('/parts/show-quarter/:quarter', show_quarter.view);
app.get('/parts/show-quarter2/:quarter', show_quarter.view2);
app.get('/', index.dashboard);

// Validate login
app.post('/planner', login.validate);
app.post('/parts/add-class/:choosenQuarter/:choosenClass', add_class.view);
app.post('/parts/rm-class-from-quarter/:quarter/:className', show_quarter.delete);


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});