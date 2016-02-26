/**
 * Created by Seiji on 1/28/2016.
 */

var data = require('../data/user-data.json');
var year = new Date().getFullYear();
var month = new Date().getMonth();
var currYear = [];
var currQuarter = [];
var futureQuarters = [];

// Grab all of the quarters in the current year
var i;
var length = data.quarters.length;
for( i=0; i < length; i++ ) {
    if( data.quarters[i].year < year ||
        (data.quarters[i].year == year-1 && data.quarters[i].Q !== "Fall") )
    {
        data.quarters[i].qState = "past";
    } else if( (data.quarters[i].year == year && data.quarters[i].Q !== "Fall") ||
        (data.quarters[i].year == year-1 && data.quarters[i].Q === "Fall")    )
    {
        currYear.push(data.quarters[i]);
    } else {
        futureQuarters.push(data.quarters[i]);
    }
}

length = currYear.length;
for( i=0; i < length; i++ ) {
    if( month <= 11 && month >= 9 && currYear[i].Q === "Fall" ) {
        currYear[i].qState = "current";
        currQuarter.push(currYear[i]);
    } else if( month >= 0 && month <= 2 && currYear[i].Q === "Winter" ) {
        currYear[i].qState = "current";
        currQuarter.push(currYear[i]);
    } else if( month <= 5 && month >= 3 && currYear[i].Q === "Spring" ) {
        currYear[i].qState = "current";
        currQuarter.push(currYear[i]);
    }
}

data.currYear = currYear;
data.currQuarter = currQuarter;
data.plannableQuarters = currYear.concat(futureQuarters);

exports.view = function(req, res) {
    res.render('index', data);
};

exports.calendar = function (req, res) {
    res.render('partials/calendar-views', data);
};

var sanitizer = require('sanitizer');
exports.chooseQuarter = function(req,res) {
    var choosenClass = sanitizer.escape(req.params.choosenClass);
    data.choosenClass = choosenClass;

    res.render('partials/choose-quarter', data);
};

exports.dashboard = function (req, res) {
    res.render('index', data);
}