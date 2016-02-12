var sanitizer = require('sanitizer');

var data = require('../data/user-data.json');
var courses = require('../data/courses.json');

exports.view = function(req, res) {
		var choosenQuarter = "" + sanitizer.escape(req.params.choosenQuarter);
		var choosenClass = "" + sanitizer.escape(req.params.choosenClass);

		var length = data.quarters.length;
		var i;
		for( i=0; i<length; i++ ) {
			if( data.quarters[i].id === choosenQuarter) {
				data.quarters[i].classes.push(courses[choosenClass].nameShort);
			}
		}

		res.render('partials/calendar-views', data);
};