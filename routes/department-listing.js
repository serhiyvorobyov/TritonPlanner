/**
 * Created by Seiji on 1/28/2016.
 */

var departments = require('../data/departments.json');

exports.view = function(req, res) {
    res.render('partials/department-listing', departments);
}