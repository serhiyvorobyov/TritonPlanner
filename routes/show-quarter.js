var userData = require('../data/user-data.json');

exports.view = function (req, res) {
    var quarter = req.params.quarter;
    var i;

    for( i=0; i < userData.quarters.length; i++ ) {
        if( userData.quarters[i].id == quarter ) break;
    }

    res.render('partials/show-quarter', userData.quarters[i]);
}