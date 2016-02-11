/**
 * Created by Seiji on 1/28/2016.
 */

var courses = require('../data/courses.json');
var sanitizer = require('sanitizer');

exports.view = function(req, res) {
    var course = "" + sanitizer.escape(req.params.course);
    res.render('partials/course-description', courses[course]);
}