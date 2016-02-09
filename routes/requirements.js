/**
 * Created by Seiji on 1/28/2016.
 */

var data = require('../data/user-data.json');

exports.view = function(req, res) {
    res.render('partials/requirements-content', data);
}