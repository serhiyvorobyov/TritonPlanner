/**
 * Created by Seiji on 1/28/2016.
 */

// Grabs all course data for all departments
var courses = require('../data/courses.json');

exports.mgt = function(req, res) {
    // Send only that department's courses
    res.render('partials/course-listing', {"courses": courses.mgt});
}