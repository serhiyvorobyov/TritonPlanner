/**
 * Created by Seiji on 1/28/2016.
 */

var courses = require('../data/courses.json');

exports.view = function(req, res) {
    res.render('course-description', courses);
}