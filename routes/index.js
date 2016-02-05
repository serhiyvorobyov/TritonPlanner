/**
 * Created by Seiji on 1/28/2016.
 */

var data = require('../data.json');

exports.view = function(req, res) {
    res.render('index', data);
}