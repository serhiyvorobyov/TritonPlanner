/**
 * Created by Seiji on 1/28/2016.
 */
var backBtnFunction;

/****************************** LOGIN CONTROLS **********************************/
function validateLogin(e) {
    console.log("entering validation...");

    /*$.ajax({
        'type': 'POST',
        'url': '/validate',
        'success': function(response)
        {
            $("body").html(response);
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });*/

    e.preventDefault();
}



/**************************** NAV BUTTON CONTROLS ********************************/
function showRequirements(e) {
    e.preventDefault();

    $.ajax({
        'type': 'GET',
        'url': '/parts/requirements-view',
        'success': function(response)
        {
            $(".main-content").html(response);
            $('#logo').hide();
            $('.back-btn').show();
            backBtnFunction = showPlanner;
            $('.back-btn')[0].addEventListener('click', backBtnFunction);
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
}

function showPlanner(e) {
    e.preventDefault();

    $.ajax({
        'type': 'GET',
        'url': '/parts/planner-view',
        'success': function(response)
        {
            $(".main-content").html(response);
            $('#logo').show();
            $('.back-btn').hide();
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
}

function showDepartments(e) {
    e.preventDefault();

    $.ajax({
        'type': 'GET',
        'url': '/parts/department-listing-view',
        'success': function(response)
        {
            // Update displayed content
            $(".main-content").html(response);

            $('#logo').hide();
            $('.back-btn').show();
            backBtnFunction = showPlanner;
            $('.back-btn')[0].addEventListener('click', backBtnFunction);

            // Link all departments to the proper next page
            $.each( $('.department-list ul li'), function(index, elem) {
                elem.addEventListener('click', showDeptClasses);
            });
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
}

/************************** CONTROLS FOR DEPARTMENT PAGES ***********************************/
function showDeptClasses(e) {
    e.preventDefault();

    $.ajax({
        'type': 'GET',
        'url': '/parts/course-listing/' + e.srcElement.id,
        'success': function(response)
        {
            $(".main-content").html(response);
            $.each( $('.course-list ul li'), function(index, elem) {
                elem.addEventListener('click', showCourseDescription);
            });
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
}

/*
 * Handles redirection to the proper course description
 */
function showCourseDescription(e) {
    e.preventDefault();

    $.ajax({
        'type': 'GET',
        'url': '/parts/course-description/'+ e.srcElement.id,
        'success': function(response)
        {
            $(".main-content").html(response);
            $(".course-description .add")[0].addEventListener('click', showQuarterSelection);
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
}

/*
 * Display all quarters and allow adding selected class to specified quarter.
 */
function showQuarterSelection(e) {
    e.preventDefault();

    

    $.ajax({
        'type': 'GET',
        'url': '/parts/choose-quarter/'+e.srcElement.parentNode.id,
        'success': function(response)
        {
            $(".main-content").html(response);
            $.each($(".addToQuarter"), function(index, elem) {elem.addEventListener('click', addClass)});
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
}

/*
 * Function will POST to /add-class/:class/:quarter/:year and it will be added to the user-data.json file
 */
function addClass(e) {
    e.preventDefault();
console.log(e);
    var choosenClass = $('.choosenClass')[0].innerHTML;
    //var quarterArr = e.srcElement.parentNode.parentNode.parentNode.childNodes[1].innerHTML.split('<br>');

    $.ajax({
        'type': 'POST',
        'url': '/parts/add-class/'+e.srcElement.parentNode.id+'/'+choosenClass,
        'success': function(response)
        {
            $(".main-content").html(response);
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
}





