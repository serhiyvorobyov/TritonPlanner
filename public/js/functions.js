/**
 * Created by Seiji on 1/28/2016.
 */

$('#requirements')[0].addEventListener('click', showRequirements);
$('#planner')[0].addEventListener('click', showPlanner);
$('#add-class')[0].addEventListener('click', showDepartments);

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
            $(".main-content").html(response);
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
}

