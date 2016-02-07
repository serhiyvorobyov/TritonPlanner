/**
 * Created by Seiji on 1/28/2016.
 */

var data = require('../data/data.json');
var currYear = new Date().getFullYear();
var currYear = [];

var i;
var length = data.quarters.length;
for( i=0; i < length; i++ ) {
    if( data.quarters[i].year == currYear) {
        currYear.push(data.quarters[i]);
    }
}

data.currYear = currYear;

exports.view = function(req, res) {
    res.render('index', data);
};

exports.calendar = function (req, res) {
    res.render('partials/calendar-views', data);
}