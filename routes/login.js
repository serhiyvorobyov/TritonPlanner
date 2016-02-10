var formidable = require('formidable');
var util = require('util');
var data = require('../data/user-data.json');

exports.view = function(req,res) {
	

	res.render('login');
}

exports.validate = function(req, res) {
	var form = new formidable.IncomingForm();

	form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        console.log(util.inspect({
            fields: fields,
            files: files
        }));
        
    });

    res.render('index', data);
}