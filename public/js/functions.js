/**
 * Created by Seiji on 1/28/2016.
 */

$('#requirements')[0].addEventListener('click', showRequirements);
$('#planner')[0].addEventListener('click', showPlanner);
$('#add-class')[0].addEventListener('click', showDepartments);


/******************************************* NAV BUTTON CONTROLS ***********************************************/
function showRequirements(e) {
    e.preventDefault();

    $.ajax({
        'type': 'GET',
        'url': '/parts/requirements-view',
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

function showPlanner(e) {
    e.preventDefault();

    $.ajax({
        'type': 'GET',
        'url': '/parts/planner-view',
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

function showDepartments(e) {
    e.preventDefault();

    $.ajax({
        'type': 'GET',
        'url': '/parts/department-listing-view',
        'success': function(response)
        {
            // Update displayed content
            $(".main-content").html(response);

            // Link all departments to the proper next page
            $('.department-list #mgt')[0].addEventListener('click', showMGTClasses);
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
}

/***************************************** CONTROLS FOR DEPARTMENT PAGES *******************************************/
function showMGTClasses(e) {
    e.preventDefault();

    $.ajax({
        'type': 'GET',
        'url': '/parts/course-listing/mgt',
        'success': function(response)
        {
            $(".main-content").html(response);
            $('.department-list #mgt18')[0].addEventListener('click', showMGTClasses);
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
}

/***************************************** CONTROLS FOR CLASS PAGES *******************************************/
// MGT Classes
function showMGT18Description(e) {
    e.preventDefault();

    $.ajax({
        'type': 'GET',
        'url': '/parts/requirements-view',
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






