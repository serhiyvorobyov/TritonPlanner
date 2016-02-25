var userData = require('../data/user-data.json');

exports.view = function (req, res) {
    var quarter = req.params.quarter;
    var i;

    for( i=0; i < userData.quarters.length; i++ ) {
        if( userData.quarters[i].id == quarter ) break;
    }

    res.render('partials/show-quarter', userData.quarters[i]);
};

exports.delete = function (req, res) {
    var quarter = req.params.quarter;
    var className = req.params.className;
    var i;

    for( i=0; i < userData.quarters.length; i++ ) {
        if( userData.quarters[i].id == quarter ) break;
    }

    userData.quarters[i].classes.splice( userData.quarters[i].classes.indexOf(className), 1 );
    res.render('partials/show-quarter', userData.quarters[i]);
};