// data reference for resume options, -like and -download
var resumeRef = new Firebase('https://popping-heat-6484.firebaseio.com/web/data/resume');

// data reference for visitors reference, -friend & -guest & -recruiter
var reachRef = new Firebase('https://popping-heat-6484.firebaseio.com/web/data/visitors');

function read(type){

    if(type === "total-reach"){
        var data_object, friend_count, guest_count, recruiter_count, enemy_count, rival_count, stalker_count;

        reachRef.once("value", function (snapshot) {
            data_object = snapshot.val();
            if (data_object !== null) {
                friend_count = parseInt(data_object.friends, 10);
                guest_count = parseInt(data_object.guests, 10);
                recruiter_count = parseInt(data_object.recruiters, 10);
                enemy_count = parseInt(data_object.enemies, 10);
                rival_count = parseInt(data_object.rivals, 10);
                stalker_count = parseInt(data_object.stalkers, 10);

                $('#friend-count').html(friend_count);
                $('#guest-count').html(guest_count);
                $('#recruiter-count').html(recruiter_count);
                $('#enemy-count').html(enemy_count);
                $('#rival-count').html(rival_count);
                $('#stalker-count').html(stalker_count);
            }
        }, function (error_object) {
            console.log("The read failed: " + error_object.code);
        });
    }
}

function performAction(caller, type, target){
    // @type : reach(-friend, -guest, -recruiter)
    // @caller : button/anchor that performed this action
    var dataObject;
    var count;

    if(type.indexOf('reach') !== (-1)){

        var visitor_type = type.split('-');
        type = visitor_type[1];

        reachRef.once("value", function(snapshot){
            dataObject = snapshot.val();
            if(dataObject !== null){
                if( type === 'friend') {
                    count = parseInt(dataObject.friends, 10) + 1;
                    reachRef.update({friends: count});
                    $('#' + target).html(count + ' (updated)');
                    $(caller).remove;
                } else if(type === 'guest'){
                    count = parseInt(dataObject.guests, 10) + 1;
                    reachRef.update({guests: count});
                    $('#' + target).html(count + ' (updated)');
                    $(caller).remove;
                } else if(type === 'recruiter'){
                    count = parseInt(dataObject.recruiters, 10) + 1;
                    reachRef.update({recruiters: count});
                    $('#' + target).html(count + ' (updated)');
                    $(caller).remove;
                } else if(type === 'enemy'){
                    count = parseInt(dataObject.enemies, 10) + 1;
                    reachRef.update({enemies: count});
                    $('#' + target).html(count + ' (updated)');
                    $(caller).remove;
                } else if(type === 'rival'){
                    count = parseInt(dataObject.rivals, 10) + 1;
                    reachRef.update({rivals: count});
                    $('#' + target).html(count + ' (updated)');
                    $(caller).remove;
                } else if(type === 'stalker'){
                    count = parseInt(dataObject.stalkers, 10) + 1;
                    reachRef.update({stalkers: count});
                    $('#' + target).html(count + ' (updated)');
                    $(caller).remove;
                }
            }
        }, function(errorObject){
            console.log("The read failed: " + errorObject.code);
        });
    }


}

window.onload = function () {
    'use strict';
};
