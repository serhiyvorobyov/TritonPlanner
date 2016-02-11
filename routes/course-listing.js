/**
 * Created by Seiji on 1/28/2016.
 */

// Grabs all course data for all departments
var dept_courses = require('../data/dept-courses.json');
var sanitizer = require('sanitizer');

exports.mgt = function(req, res) {
    // Send only that department's courses
    var department = "" + sanitizer.escape(req.params.department);
    res.render('partials/course-listing', {"courses": dept_courses[department]});
}