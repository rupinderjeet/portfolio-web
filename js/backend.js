// check if internet connectivity is available
function checkInternet(){
    //@TODO: for now :D
    var availability = true;

    return availability;
}

// declare database reference variables
var resumeRef, reachRef;

// check if internet is alive & initiate database objects for reading/writing database
if(checkInternet()){
    // data reference for resume options, -like and -download
    resumeRef = new Firebase('https://popping-heat-6484.firebaseio.com/web/data/resume');

    // data reference for visitors reference, -friend & -guest & -recruiter
    reachRef = new Firebase('https://popping-heat-6484.firebaseio.com/web/data/visitors');
}

/* Handy Contact Form */
function submitContactForm(){
    'use strict';

    // hide error box
    $('#handy-contact-form-error').slideUp('fast');

    // collect information from DOM
    var userName = $('#user-name').val();
    var userEmail = $('#user-email').val();
    var userTwitter = $('#user-twitter').val();
    var userWhatsapp = $('#user-whatsapp').val();
    var userMessage = $('#user-message').val();
    var enquiryType = $('#enq-type').val();
    var gotcha = $('#gotcha').val();

    // 'undefined' value prevention
    if(userTwitter === ""){
        userTwitter = "Not Provided";
    }

    // 'undefined' value prevention
    if(userWhatsapp === ""){
        userWhatsapp = "Not Provided";
    }

    // Validate the collected input information
    var error = (userName.trim().length < 2 || userEmail.trim().length < 4 || userEmail.trim().indexOf("@") === (-1)
    || userEmail.trim().indexOf(".") === (-1) || userMessage.trim().length < 10);

    // check for errors
    if(error){
        // show error box
        $('#handy-contact-form-error').slideDown('fast');
    } else {
        // initiate AJAX request for storing data
        $.ajax({
            url: "https://formspree.io/rupinderjeet47@gmail.com",
            method: "POST",
            data: {
                gotcha: gotcha,
                userName: userName,
                userEmail: userEmail,
                userTwitter: userTwitter,
                userWhatsapp: userWhatsapp,
                userMessage: userMessage,
                enquiryType: enquiryType
            },
            dataType: "json",
            error: function () {
                // AJAX request failed, handle error
                $('#handy-contact-form').remove();
                $('#handy-contact-form-thanks').remove();
                $('#handy-form-btn').html("Error! Try again Later");
            },
            success: function (data) {
                // AJAX request is successful
                $('#handy-contact-form').remove();
                $('#handy-contact-form-thanks').slideDown('fast');
                $('#handy-form-btn').html("Contacted Successfully!");
                $('#handy-form-btn').addClass("btn-success");
                $('#handy-form-btn').removeClass("btn-danger");
                $('#handy-form-btn').prop("onclick", null);
            }
        });
    }
}
function clearContactForm(){

}

/* Attendance Form */
function submitAttendanceForm(element){
    'use strict';

    // hide error box
    $('#attendance-form-error').slideUp('fast');

    // collect visitor information from DOM
    var visitorName = $('#visitor-name').val();
    var visitorEmail = $('#visitor-email').val();
    var visitorTwitter = $('#visitor-twitter').val();
    var visitorWhatsapp = $('#visitor-whatsapp').val();
    var visitorType = $('#visitor-type').val();
    var gotcha = $('#gotcha-attendance').val();

    // 'undefined' value prevention
    if(visitorTwitter === ""){
        visitorTwitter = "Not Provided";
    }

    // 'undefined' value prevention
    if(visitorWhatsapp === ""){
        visitorWhatsapp = "Not Provided";
    }

    // validate the collected input information of visitor
    var error = (visitorName.trim().length < 2 || visitorEmail.trim().length < 4 || visitorEmail.trim().indexOf("@") === (-1)
    || visitorEmail.trim().indexOf(".") === (-1) || visitorType.trim() === "Select One");

    // check for errors
    if(error){
        // show error box
        $('#attendance-form-error').slideDown('fast');
    } else {
        //initiate AJAX request for storing data
        $.ajax({
            url: "https://formspree.io/rupinderjeet47@gmail.com",
            method: "POST",
            data: {
                gotcha: gotcha,
                visitorName: visitorName,
                visitorEmail: visitorEmail,
                visitorTwitter: visitorTwitter,
                visitorWhatsapp: visitorWhatsapp,
                visitorType: visitorType
            },
            dataType: "json",
            error: function () {
                // AJAX request failed, handle error
                $('#attendance-form-modal').hide();
                $('#attendance-form').remove();
                $('#attendance-form-thanks').remove();
                $('#attendance-form-btn').html("Error! Try again later");
            },
            success: function (data) {
                // AJAX request successful, show thanks box

                // increase visitor count according to visitor type
                if(visitorType === "Friend" || visitorType === "Guest" || visitorType === "Recruiter" || visitorType === "Enemy" || visitorType === "Rival" || visitorType === "Stalker"){
                    performAction($('#attendance-form-btn'), 'reach-' + visitorType.toLowerCase(), visitorType.toLowerCase() + '-count');
                }

                $(element).hide();
                $('#attendance-form').remove();
                $('#attendance-form-error').remove();
                $('#attendance-form-thanks').slideDown('fast');
                $('#attendance-form-btn').html("Attended Successfully!");
                $('#attendance-form-btn').addClass("btn-success");
                $('#attendance-form-btn').removeClass("btn-danger");

                $(element).prop("onclick", null);
                $('#attendance-form-btn').prop("data-toggle", null);
                $('#attendance-form-btn').prop("data-target", null);

                // refresh visitor count on DOM
                read('total-reach');
            }
        });
    }
}
function clearAttendanceForm(){

}

/* Report An Issue */
function reportIssue(submitBtn){
    'use strict';

    // hide all error boxes
    $('#report-issue-error').slideUp('fast');
    $('#report-issue-server-error').slideUp('fast');

    // collect reporting information
    var reporterName = $('#reporter-name').val();
    var reporterEmail = $('#reporter-email').val();
    var issueTitle = $('#report-issue-title').val();
    var issueDetails = $('#report-issue-description').val();
    var gotcha = $('#gotcha').val();

    // validate report form
    var error = (reporterName.trim().length < 2 || reporterEmail.trim().length < 4 || reporterEmail.trim().indexOf("@") === (-1)
    || reporterEmail.trim().indexOf(".") === (-1) || issueTitle.trim().length < 5 || issueDetails.trim().length < 20);

    // check for errors
    if(error){
        // show input error
        $('#report-issue-error').slideDown('fast');
    } else {
        // initiate AJAX request
        $.ajax({
            url: "https://formspree.io/rupinderjeet47@gmail.com",
            method: "POST",
            data: {
                gotcha: gotcha,
                reporterName: reporterName,
                reporterEmail: reporterEmail,
                issueTitle : issueTitle,
                issueDetails: issueDetails
            },
            dataType: "json",
            error: function () {
                // AJAX request failed, handle error, show server error
                $('#report-issue-input').slideUp('fast');
                $('#report-issue-thanks').slideUp('fast');
                $('#report-issue-server-error').slideDown('fast');
                $(submitBtn).hide('fast');
            },
            success: function (data) {
                // AJAX request successful, show confirmation box
                $('#report-issue-input').remove();
                $('#report-issue-thanks').slideDown('fast');
                $(submitBtn).remove();
                $('report-issue-btn').html("Issue Reported Successfully!");
                $('report-issue-btn').addClass("btn-success");
                $('report-issue-btn').removeClass("btn-default");
                $('report-issue-btn').prop("data-toggle", null);
                $('report-issue-btn').prop("data-target", null);
            }
        });
    }
}

// read values from database according to 'type' variable
function read(type){
    // @type: total-reach

    if(type === "total-reach"){
        // declare database object and visitor type variables
        var data_object, friend_count, guest_count, recruiter_count, enemy_count, rival_count, stalker_count;

        // send 'one-time' read request to database
        reachRef.once("value", function (snapshot) {

            // collected data according to 'reachRef' and stored in 'data_object'
            data_object = snapshot.val();

            // check if retrieved database object is empty/null
            if (data_object !== null) {
                // read values from data_object and store in respective variables
                friend_count = parseInt(data_object.friends, 10);
                guest_count = parseInt(data_object.guests, 10);
                recruiter_count = parseInt(data_object.recruiters, 10);
                enemy_count = parseInt(data_object.enemies, 10);
                rival_count = parseInt(data_object.rivals, 10);
                stalker_count = parseInt(data_object.stalkers, 10);

                // show retrieved values in DOM
                $('#friend-count').html(friend_count);
                $('#guest-count').html(guest_count);
                $('#recruiter-count').html(recruiter_count);
                $('#enemy-count').html(enemy_count);
                $('#rival-count').html(rival_count);
                $('#stalker-count').html(stalker_count);
            }
        }, function (error_object) {
            // read failed, week connection or no internet
            console.log("The read failed: " + error_object.code);
        });
    }
}

// perform an update action to the database
function performAction(caller, type, target){
    // @type : reach(-friend, -guest, -recruiter)
    // @caller : button/anchor that performed this action
    // @target : the element where returned/updated data needs to be refreshed

    var dataObject, count;

    // identify action type
    if(type.indexOf('reach') !== (-1)){

        // identify sub-action type (if-any)
        var visitor_type = type.split('-');
        type = visitor_type[1];

        // send 'one-time' read request to database
        reachRef.once("value", function(snapshot){

            // store received information
            dataObject = snapshot.val();

            // check if received information is empty/null
            if(dataObject !== null){

                /* perform action based on 'type' variable
                *  1. read the related value and increase it by 1, then store in 'count' variable
                *  2. update new 'count' in the database
                * */

                switch(type){
                    case 'friend':
                        count = parseInt(dataObject.friends, 10) + 1;
                        reachRef.update({friends: count});
                        break;
                    case 'guest':
                        count = parseInt(dataObject.guests, 10) + 1;
                        reachRef.update({guests: count});
                        break;
                    case 'recruiter':
                        count = parseInt(dataObject.recruiters, 10) + 1;
                        reachRef.update({recruiters: count});
                        break;
                    case 'enemy':
                        count = parseInt(dataObject.enemies, 10) + 1;
                        reachRef.update({enemies: count});
                        break;
                    case 'rival':
                        count = parseInt(dataObject.rivals, 10) + 1;
                        reachRef.update({rivals: count});
                        break;
                    case 'stalker':
                        count = parseInt(dataObject.stalkers, 10) + 1;
                        reachRef.update({stalkers: count});
                        break;
                    default:
                        console.log('Visitor type is not identified');
                }

                // refresh the target element's html (if any)
                $('#' + target).html(count + ' (updated)');

                // remove the button that called for this action, less chance of duplicate data
                $(caller).remove;
            }
        }, function(errorObject){
            // database read request failed
            console.log("The read failed: " + errorObject.code);
        });
    }

}

// action to perform when the document has fully loaded
window.onload = function () {
    'use strict';

};