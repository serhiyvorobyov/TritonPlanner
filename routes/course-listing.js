/**
 * Created by Seiji on 1/28/2016.
 */

var courses = require('../data/courses.json');
courses.header = "List of Courses";
courses.image = "https://cdn4.iconfinder.com/data/icons/dot/256/arrow_left.png";

exports.view = function(req, res) {
    var department = req.query.department;
    console.log(courses[department]);
    res.render('partials/course-listing', { "courses": courses[department] });
}