var resumeRef = new Firebase('https://popping-heat-6484.firebaseio.com/web/data/resume');

function readFirebaseDatabase(type){

    //Resume Likes & Downloads
    if(type === "resume") {
        var data_object, like_count, download_count;

        resumeRef.once("value", function (snapshot) {
            data_object = snapshot.val();
            if (data_object !== null) {
                like_count = parseInt(data_object.likes, 10);
                download_count = parseInt(data_object.downloads, 10);
                $('#resume-likes').html(like_count + ' Likes');
                $('#resume-downloads').html(download_count + ' Downloads');
            }
        }, function (error_object) {
            console.log("The read failed: " + error_object.code);
        });
    }
}

function performAction(caller, type, target){
    // @type : like, download
    // @caller : button/anchor that performed this action
    var dataObject;
    var count;

    resumeRef.once("value", function(snapshot){
        dataObject = snapshot.val();
        if(dataObject !== null){
            if( type === 'like') {
                count = parseInt(dataObject.likes, 10) + 1;
                resumeRef.update({likes: count});
                $('#' + target).html(count + ' Likes');
                $(caller).remove;
            } else if(type === 'download'){
                count = parseInt(dataObject.downloads, 10) + 1;
                resumeRef.update({downloads: count});
                $('#' + target).html(count + ' Downloads');
                $(caller).remove;
            }
        }
    }, function(errorObject){
        console.log("The read failed: " + errorObject.code);
    });
}

window.onload = function () {
    'use strict';

    //$('[data-toggle="tooltip"]').tooltip();

    readFirebaseDatabase('resume');
};
