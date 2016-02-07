/**
 * Created by Seiji on 1/28/2016.
 */
var requirementsPage; // html for requirements page will be here.
var plannerPage; // html for planner page will be here.
var departmentsPage; // html for adding a class will be here.

$('#requirements')[0].addEventListener('click', showRequirements);
$('#planner')[0].addEventListener('click', showPlanner);
$('#add-class')[0].addEventListener('click', showDepartments);

function showRequirements(e) {
    e.preventDefault();

    $(".main-content").html(requirementsPage);
}

function showPlanner(e) {
    e.preventDefault();

    $(".main-content").html(plannerPage);
}

function showDepartments(e) {
    e.preventDefault();

    $(".main-content").html(departmentsPage);
}

$('document').ready( function() {
    $.ajax({
        'type': 'GET',
        'url': '/parts/requirements-view',
        'success': function(response)
        {
            requirementsPage = response;
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
    $.ajax({
        'type': 'GET',
        'url': '/parts/planner-view',
        'success': function(response)
        {
            plannerPage = response;
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
    $.ajax({
        'type': 'GET',
        'url': '/parts/department-listing-view',
        'success': function(response)
        {
            departmentsPage = response;
        },
        'error': function(jqXHR, textStatus, errorThrown)
        {
            console.log('Error on saving appointment:', jqXHR, textStatus, errorThrown);
        }
    });
});