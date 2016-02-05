/**
 * Created by Seiji on 1/28/2016.
 */

var data = require('../data/data.json');
data.header = "Triton Planner";

exports.view = function(req, res) {
    res.render('requirements', data);
}