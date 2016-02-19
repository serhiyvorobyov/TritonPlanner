;(function() {
    // Modules
    var request = require('request');
    var cheerio = require('cheerio');
    var fs = require('fs');

    // Data
    var URLsArray = require('./data/course-catalog-URLs.json').catalog;
    var courseData = require('./data/courses.json');
    var deptCourses = require('./data/dept-courses.json');

    // Variables
    var department;
    var url;
    var $;
    var deptCoursesTemplate;

    var i;
    var length = URLsArray.length;
    for( i=0; i<length; i++ ) {
        //console.log(URLsArray);
        url = URLsArray[i].URL;

        // Be careful. This is an asynchronous call.
        request(url, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                $ = cheerio.load(body);
                var deptClasses = [];
                var json;
                var courseName;
                var courseNumbers;
                var courseUnits;
                var courseParts;

                // The next element after the heading (upper/lower div) is an <a> element to support anchors.
                // I am grabbing the very first one to determine which department we are in.
                department = $('.course-subhead-1').next().attr('name').replace(/[^a-zA-Z]/, '');

                // Grab all of the course titles
                $('.course-name').each(function(i, elem) {
                    courseName = $(this).text();
                    courseNumbers = courseName.split('.')[0].split("/"); // In the case: COURSE/COURSE
                    courseUnits = courseName.split('.')[1].indexOf("(");
                    json = {
                        id: "",
                        name: "",
                        nameShort: "",
                        units: "",
                        description: "",
                        evalsURL: "http://cape.ucsd.edu/responses/Results.aspx?courseNumber=",
                        addURL: "/",
                        prereqs: []
                    };

                    deptCoursesTemplate = {
                        "id": "",
                        "name": "",
                        "units": ""
                    };

                    // Course number may not have department in front it so must insert one.
                    var classId =
                        courseNumbers[0].split(' ').length > 1 ?
                            courseNumbers[0].split(' ').join('+') : department.toUpperCase() + "+" + courseNumbers[0];
                    json.nameShort =
                        courseNumbers[0].split(' ').length > 1 ?
                            courseNumbers[0] : department.toUpperCase() + " " + courseNumbers[0];

                    json.evalsURL = json.evalsURL + classId;


                    //console.log(json.evalsURL);
                    /* For all detected courses (if multiple) remove special characters,
                       make department lowercase, and replace current array index with new class name.
                     */
                    courseNumbers.forEach( function(elem, index, arr) {
                        courseParts = elem.replace(/[^\w\s]/gi, '').split(/\s+/);
                        if( courseParts.length > 1) {
                            arr[index] = courseParts[0].toLowerCase() + courseParts[1];
                        } else {
                            arr[index] = department + courseParts[0];
                        }

                    });

                    // Merge courses together if there are multiple
                    json.id = courseNumbers[1] ? courseNumbers.join('/'): courseNumbers[0];
                    json.name = courseName.split('.')[1].split(" (")[0].substr(1); // Grab title up to the units
                    json.units = courseName.split('.')[1].substr(courseUnits);

                    deptCoursesTemplate.id = json.id;
                    deptCoursesTemplate.name = json.nameShort+" : "+json.name;
                    deptCoursesTemplate.units = json.units;

                    deptCourses[department].push(deptCoursesTemplate);

                    deptClasses.push(json);
                });

                $('.course-descriptions').each(function(index, elem) {
                    var courseDescription = $(this).text().split(' Prerequisites: ');
                    if( index < deptClasses.length) {
                        deptClasses[index].description = courseDescription[0];
                        deptClasses[index].prereqs.push(courseDescription[1] ? courseDescription[1] : "none");
                    }

                });

                var lengthDeptArr = deptClasses.length;
                var j;

                for( j=0; j<lengthDeptArr; j++ ) {
                    courseData[deptClasses[j].id] = deptClasses[j];
                }

                console.log(deptClasses);

            } else {
                console.log("Issue with request...");
            }

            fs.writeFile('./data/courses.json', JSON.stringify(courseData, null, 4), function(err) {
                if(!err) {
                    console.log("You've successfully updated courses.json with the most current classes and descriptions!");
                } else {
                    console.log(err);
                }
            });
            fs.writeFile('./data/dept-courses.json', JSON.stringify(deptCourses, null, 4), function(err) {
                if(!err) {
                    console.log("You've successfully updated courses.json with the most current classes and descriptions!");
                } else {
                    console.log(err);
                }
            });
        });
    }


})();