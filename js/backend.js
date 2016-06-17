// check if internet connectivity is available
function checkInternet(){
    //@TODO: for now :D
    var availability = true;


    return availability;
}

// declare database reference variables
var resumeRef, visitorRef, reachRef, taskRef;

// check if internet is alive & initiate database objects for reading/writing database
if(checkInternet()){
    // data reference for resume options, -like and -download
    resumeRef = new Firebase('https://popping-heat-6484.firebaseio.com/web/data/resume');

    // data reference for visitors reference, -friend & -guest & -recruiter
    visitorRef = new Firebase('https://popping-heat-6484.firebaseio.com/web/data/visitors');

    // data reference for reach data
    reachRef = new Firebase('https://popping-heat-6484.firebaseio.com/web/data/reach');

    // data reference for data of all tasks
    taskRef = new Firebase('https://popping-heat-6484.firebaseio.com/web/data/tasks');
}

/* Contact Form */
function submitContactForm(element){
    'use strict';

    // hide error box
    $('#contact-form-error').slideUp('fast');

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
        $('#contact-form-error').slideDown('fast');
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
                $('#contact-form-modal').modal('hide');

                $('#contact-form-btn').hide('fast');
                $('#contact-form-btn-response').addClass('f-crimson').removeClass('f-green').html('Contact Error').show('hide');
            },
            success: function (data) {
                // AJAX request is successful
                $('#contact-form').remove();
                $('#contact-form-thanks').slideDown('fast');

                $(element).hide('fast');
                $('#contact-form-btn').hide('fast');
                $('#contact-form-btn-response').addClass("f-green").removeClass("f-crimson").html('Contacted').show('fast');
            }
        });
    }
}

/* Attendance Form */
function submitAttendanceForm(element){
    'use strict';

    // hide success/failure response of an attendance
    $('#attendance-form-btn-response').hide('fast');
    $('#attendance-form-btn-response').html('');

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
                $('#attendance-form-modal').modal('hide');

                // show response text
                $('#attendance-form-btn-response').html("Error! Try again later");
                $('#attendance-form-btn-response').addClass("f-crimson").removeClass("f-green").show('fast');
            },
            success: function (data) {
                // AJAX request successful, show thanks box

                // increase visitor count according to visitor type
                if(visitorType === "Friend" || visitorType === "Guest" || visitorType === "Recruiter" || visitorType === "Enemy" || visitorType === "Rival" || visitorType === "Stalker"){
                    performAction($('#attendance-form-btn'), 'visitor-' + visitorType.toLowerCase(), visitorType.toLowerCase() + '-count');
                }

                $(element).hide();
                $('#attendance-form').hide();
                $('#attendance-form-error').hide();
                $('#attendance-form-thanks').slideDown('fast');
                $('#attendance-form-btn').hide('fast');

                $('#attendance-form-btn-response').addClass("f-green").removeClass("f-crimson").html("Attended Successfully!").show('fast');

                $(element).prop("onclick", '');

                // add current user to 'this-visitor' div on index.html, preventing double attendance
                $('#this-visitor').html($('#this-visitor').html() + ' attendance');

                // refresh visitor count on DOM
                read('visitors');
            }
        });
    }
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

                $('#report-issue-btn').hide('fast');
            }
        });
    }
}

// read values from database according to 'type' variable
function read(type){
    // @type: visitors, reach

    if(type === "visitors"){
        // declare database object and visitor type variables
        var data_object, friend_count, guest_count, recruiter_count, enemy_count, rival_count, stalker_count;

        // send 'one-time' read request to database
        visitorRef.once("value", function (snapshot) {

            // collected data according to 'visitorRef' and stored in 'data_object'
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
    } else if(type === "reach"){
        // declare database object and reach counter variables
        var data_object, reach_count;

        // send 'one-time' read request to database
        reachRef.once("value", function (snapshot) {

            // collected data according to 'reachRef' and stored in 'data_object'
            data_object = snapshot.val();

            // check if retrieved database object is empty/null
            if (data_object !== null) {
                // read values from data_object and store in respective variables
                reach_count = parseInt(data_object.rupinderjeet_com, 10);

                // show retrieved values in DOM
                $('#reach-count').html(reach_count);
            }
        }, function (error_object) {
            // read failed, week connection or no internet
            console.log("The read failed: " + error_object.code);
        });
    } else if(type === "task-likes"){
        // declare database object and reach counter variables
        var data_object, task_like_count;

        // send 'one-time' read request to database
        taskRef.once("value", function (snapshot) {

            // collected data according to 'taskRef' and stored in 'data_object'
            data_object = snapshot.val();

            // check if retrieved database object is empty/null
            if (data_object !== null) {
                // read values from data_object and store in respective variables & show retrieved values in DOM
                $('#task-000-likes').html(parseInt(data_object.task000, 10) + ' likes');
                $('#task-001-likes').html(parseInt(data_object.task001, 10) + ' likes');
            }
        }, function (error_object) {
            // read failed, week connection or no internet
            console.log("The read failed: " + error_object.code);
        });
    }
}

// perform an update action to the database
function performAction(caller, type, target){
    // @type : visitor(-friend, -guest, -recruiter) & update-reach & task-***
    // @caller : button/anchor that performed this action
    // @target : the element where returned/updated data needs to be refreshed

    var dataObject, count;

    // identify action type
    if(type.indexOf('visitor') !== (-1)){

        // identify sub-action type (if-any)
        var visitor_type = type.split('-');
        type = visitor_type[1];

        // send 'one-time' read request to database
        visitorRef.once("value", function(snapshot){

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
                        visitorRef.update({friends: count});
                        break;
                    case 'guest':
                        count = parseInt(dataObject.guests, 10) + 1;
                        visitorRef.update({guests: count});
                        break;
                    case 'recruiter':
                        count = parseInt(dataObject.recruiters, 10) + 1;
                        visitorRef.update({recruiters: count});
                        break;
                    case 'enemy':
                        count = parseInt(dataObject.enemies, 10) + 1;
                        visitorRef.update({enemies: count});
                        break;
                    case 'rival':
                        count = parseInt(dataObject.rivals, 10) + 1;
                        visitorRef.update({rivals: count});
                        break;
                    case 'stalker':
                        count = parseInt(dataObject.stalkers, 10) + 1;
                        visitorRef.update({stalkers: count});
                        break;
                    default:
                        console.log('Visitor type is not identified');
                }

                // refresh the target element's html (if any)
                $('#' + target).html(count + '*');

                // remove the button that called for this action, less chance of duplicate data
                $(caller).remove;
            }
        }, function(errorObject){
            // database read request failed
            console.log("The read failed: " + errorObject.code);
        });
    } else if(type === 'update-reach'){

        // send 'one-time' read request to database
        reachRef.once("value", function(snapshot){

            // store received information
            dataObject = snapshot.val();

            // check if received information is empty/null
            if(dataObject !== null){

                /* perform action based on 'type' variable
                 *  1. read the related value and increase it by 1, then update in database
                 * */

                count = parseInt(dataObject.rupinderjeet_com, 10) + 1;
                reachRef.update({rupinderjeet_com: count});
            }
        }, function(errorObject){
            // database read request failed
            console.log("The read failed: " + errorObject.code);
        });
    } else if(type.indexOf('task') !== (-1)){

        // identify sub-action type (if-any)
        var task_data = type.split('-');
        type = task_data[1];


        // send 'one-time' read request to database
        taskRef.once("value", function(snapshot){

            // store received information
            dataObject = snapshot.val();

            // check if received information is empty/null
            if(dataObject !== null){

                /* perform action based on 'type' variable
                 *  1. read the related value and increase it by 1, then update in database
                 * */
                switch(type){
                    case '000':
                        count = parseInt(dataObject.task000, 10) + 1;
                        taskRef.update({task000: count});
                        break;
                    case '001':
                        count = parseInt(dataObject.task001, 10) + 1;
                        taskRef.update({task001: count});
                        break;

                    default: console.log('task number(not found) is : ' + type);
                }


                $(caller).html('Liked').prop('onclick', '');
                $('#' + target).html(count + " likes");
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