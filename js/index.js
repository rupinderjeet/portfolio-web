/*jslint browser:true */
var feedbackInterval;

function getElement(id){
	return document.getElementById(id);
}

function comingSoon(){
    alert('Coming Soon!');
}

//FOR ABOUT PAGE ONLY
function showNextImage(type, clicktype) {
    'use strict';
    //@type = forward, backword
    var i = 0, display = false;

    if (type === undefined) {
        type = "forward";
    }

    for (i = 1; i < 6; i += 1) {
        display = document.getElementById('pic-' + i).getAttribute('class').indexOf('no-display') === -1;		//tells that this image is displaying right now
        if (display) {
            document.getElementById('pic-' + i).setAttribute('class', document.getElementById('pic-' + i).getAttribute('class').replace('display', 'no-display'));

            if (type === 'forward') {
                if (i === 5) { i = 0; }
                document.getElementById('pic-' + (parseInt(i, 10) + 1)).setAttribute('class', document.getElementById('pic-' + (parseInt(i, 10) + 1)).getAttribute('class').replace('no-display', 'display'));
            } else if (type === 'backward') {
                if (i === 1) { i = 6; }
                document.getElementById('pic-' + (parseInt(i, 10) - 1)).setAttribute('class', document.getElementById('pic-' + (parseInt(i, 10) - 1)).getAttribute('class').replace('no-display', 'display'));
            }

            if (clicktype !== undefined && clicktype === "btnclick") {
                changeSlideShowState('pause', document.getElementById('slideshow-btn'));
            }

            break;
        }
    }
}

//FOR SLIDE SHOWS
function alterImageGallery(movement, target) {
    'use strict';
    //@movement = next, previous
    //@target = container 'div' element for images

    var i = 0;
    var prev_control = 'prev-' + target;
    var next_control = 'next-' + target;

    if (movement === undefined) { movement = "next"; }

    var current_image_index = '#current-' + target;
    var images = $("#" + target).children("img");
    var imageCount = images.length;
    var current_image, prev_image, next_image, new_index;

    for(var i=0; i <= imageCount; i++){
        current_image = images[i];
        prev_image = images[parseInt(i, 10) - 1];
        next_image = images[parseInt(i, 10) + 1];

        if ($(current_image).hasClass("display")) {

            $(current_image).addClass('no-display');
            $(current_image).removeClass('display');

            if (movement === "next") {
                $(next_image).addClass('display');
                $(next_image).removeClass('no-display');

                new_index = (parseInt(i, 10) + 1);
                $(current_image_index).html('Screens(' + (new_index+1) + '/' + imageCount + ')');
            } else if (movement === "prev") {
                $(prev_image).addClass('display');
                $(prev_image).removeClass('no-display');

                new_index = (parseInt(i, 10) - 1);
                $(current_image_index).html('Screens(' + (new_index+1) + '/' + imageCount + ')');
            }

            if( new_index >= (parseInt(imageCount, 10) - 1) ){      //new_index >= (n-1)
                $("#" + next_control).hide('fast');
            } else {
                $("#" + next_control).show('fast');
            }

            if( new_index <= 0 ){
                $("#" + prev_control).hide('fast');
            } else {
                $("#" + prev_control).show('fast');
            }

            break;
        }
    }
}

//FOR ABOUT PAGE ONLY
function changeSlideShowState(type, element) {
	'use strict';

	if (element !== undefined) {
		if (type === "play") {
			element.innerHTML = "pause";
			element.setAttribute('onclick', element.getAttribute('onclick').replace('play', 'pause'));
		} else if (type === "pause") {
			element.innerHTML = "play";
			element.setAttribute('onclick', element.getAttribute('onclick').replace('pause', 'play'));
		}
	}

	if (type === "play") {
		slideShow = setInterval(showNextImage, 1000);
	} else if (type === "pause") {
		clearInterval(slideShow);
	}
}

function toggleString(element, str1, str2) {
	'use strict';
	if ($(element).html().trim() === str1) {
		$(element).html(str2);
	} else if ($(element).html().trim() === str2) {
		$(element).html(str1);
	}
}

function startTimer(targetId) {
	'use strict';
	targetId = "feedback-waiting-timer";
	
	if ($('#' + targetId).length) {
		var alottedTime = parseInt($('#' + targetId).html().replace("Waiting Timer : ", ""), 10);
		var newTime = alottedTime - 1;

		if (parseInt(newTime, 10) < 0) {
			document.getElementById(targetId).parentNode.innerHTML = document.getElementById('loading-issue').innerHTML;
			clearInterval(feedbackInterval);
		} else {
			$('#' + targetId).html("Waiting Timer : " + newTime);
		}
	}
}

function btnClick(source, btn, index) {
	'use strict';
    var text;

	if (source === 'bar') {
		/* 'btn-bar' is a special-empty-class used to target menu-bar-buttons only */
		
		$('.btn-bar').addClass('btn-default');
		$('.btn-bar').removeClass('btn-focused');
		$(btn).removeClass('btn-default');
		$(btn).addClass('btn-focused');
		index = parseInt(index, 10);
		
		$("#theSlider").carousel(index);

        var btnText = $(btn).html().trim().toLowerCase();
        $("#" + btnText + "-slide").load("html/" + btnText + ".html", function() {
            if (index === 7) {	//feedback button clicked
                clearInterval(feedbackInterval); 								//In case, if it is already counting
                feedbackInterval = setInterval(startTimer, 1000);
                initFeedbackDisqus();
            } else if (index === 8) {	//statistics button clicked
                if( $('#this-visitor').html().trim().indexOf('attendance') !== (-1)){
                    $('#attendance-form-btn').hide('fast');
                    $('#attendance-form-btn-response').html('Attended Successfully!').show('fast');
                }

                read('visitors');
                read('reach');
            }
        });  //Loads html page according to button clicked
	} else if (source === "btn") {
        text = index;
        $("#" + text + "-slide").load("html/" + text + ".html", null, null);
    } else if (source === 'load-images') {
        //For this to work button must be enclosed in a div element.
        //@TODO : btn gets loading animation, source + index gets loaded data
        var btnText = $(btn).html().trim();

        //Button Animation Code

        var targetContainer = $(btn).parent();
        $(targetContainer).hide();
        $(targetContainer).addClass('text-center');

        $(targetContainer).load('snippets/loadImages.html #set-' + index, function () {
            //on complete
            $(targetContainer).slideDown('fast');
        });
    }

}

function initFeedbackDisqus() {
	'use strict';
	(function () {
		var d = document, s = d.createElement('script');

		s.src = '//rupinderjeet.disqus.com/embed.js';

		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
	})();
}

function arrowAnimation(element){
    $('#links').slideToggle('fast');
    $('#arrow').attr('id', 'arrow-clicked');
    $('#arrow-clicked').toggleClass('glyphicon-chevron-down');
    $('#arrow-clicked').toggleClass('glyphicon-chevron-up');
}

window.onload = function () {
	'use strict';
	$("#home-slide").load("html/home.html", null, null);
    performAction(null, 'update-reach', null);
};

//GLOBAL VARIABLES
var slideShow;              // used by about page's 'play' button as an interval

// 'on-event' function methods
if (checkInternet()) {
    $('#report-issue-modal').on('hidden.bs.modal', function (e) {
        $('#report-modal-body').load('index.html #report-modal-body', null, null);
    });
    $('#contact-form-modal').on('hidden.bs.modal', function (e) {
        $('#contact-modal-body').load('index.html #contact-modal-body', null, null);
    });
    $('#attendance-form-modal').on('hidden.bs.modal', function (e) {
        $('#attendance-modal-body').load('index.html #attendance-modal-body', null, null);
    });
}