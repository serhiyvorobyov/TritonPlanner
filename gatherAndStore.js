;(function() {
    // Modules
    var request = require('request');
    var cheerio = require('cheerio');
    var YQL = require('yql');


    // Data
    var URLsArray = require('./data/course-catalog-URLs.json').catalog;
    var courseData = require('./data/courses.json');

    // Variables
    var $;

    //console.log(URLsArray);
    request('http://www.ucsd.edu/catalog/courses/CSE.html', function (err, res, body) {
        if (!err && res.statusCode == 200) {
            $ = cheerio.load(body);

            // Grab all of the course titles
            $('.course-name').each(function(i, elem) {
                var courseName = $(this).text();
                var courseNumbers = courseName.split('.')[0].split("/"); // In the case: COURSE/COURSE
                var courseTitle = courseName.split('.')[1];
                var courseParts;
                var courseID;

                /* For all detected courses (if multiple) remove special characters,
                   make department lowercase, and replace current array index with new class name.
                 */
                courseNumbers.forEach( function(elem, i, arr) {
                    courseParts = elem.replace(/[^\w\s]/gi, '').split(/\s+/);
                    //console.log(courseParts);
                    arr[i] = courseParts[0].toLowerCase() + courseParts[1];
                })

                // Merge courses together if there are multiple
                courseID = courseNumbers.join('/');
                console.log(courseID, courseTitle, '\n');

            });

            //console.log($('p.course-descriptions').nextAll().html());
        }
    });
})();