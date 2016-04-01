/*jslint browser:true */
var feedbackInterval;

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

function toggleString(element, str1, str2){
	console.log(element + " -- " + str1 + " -- " + str2);
	
	if( $(element).html().trim() === str1 ) {
		$(element).html(str2);
	} else if ( $(element).html().trim() === str2 ) {
		$(element).html(str1);
	}
}

function startTimer(targetId){
	targetId = "feedback-waiting-timer";
	
	if($('#' + targetId).length) {
		var alottedTime = parseInt( $('#' + targetId).html().replace("Waiting Timer : ", ""), 10);
		var newTime = alottedTime - 1;

		if(parseInt(newTime, 10) < 0){
			document.getElementById(targetId).parentNode.innerHTML = document.getElementById('loading-issue').innerHTML;
			clearInterval(feedbackInterval);
		} else {
			$('#' + targetId).html("Waiting Timer : " + newTime);
		}
	}
}

function btnClick(source, btn, index) {
	'use strict';
	
	var btnText = $(btn).html().trim().toLowerCase();
	if(btnText !== "feedback"){
		$("#" + btnText + "-slide").load("html/" + btnText + ".html", null, null);
	}
	
	if (source === 'bar') {
		/* TF5FD is a special-empty-class used to target menu-bar-buttons only */
		
		$('.TF5FD').addClass('btn-default');
		$('.TF5FD').removeClass('btn-focused');
		$(btn).removeClass('btn-default');
		$(btn).addClass('btn-focused');
		index = parseInt(index, 10);
		
		$("#theSlider").carousel(index);
	} else if (source === "mobile-bar") {
		/*
		*  @btn is DOM's 'select' element here
		*  @btn.selectedIndex is carousel's 'data-slide-to' value
		*/
		btn.blur();
		index = parseInt(btn.selectedIndex, 10);
		$("#theSlider").carousel(index);	// Slide to Selected Menu Item
	}
	
	if (index === 7) {	//feedback button clicked
		clearInterval(feedbackInterval); 	//In case, if it is already counting
		feedbackInterval = setInterval(startTimer, 1000);
		initFeedbackDisqus();
	}
}

function expandItem(element) {
	'use strict';
	
	//@itemstate: expanded, collapsed(default)
	
	$(element).removeClass('col-md-3');
	$(element).addClass('col-md-12');
}

function initFeedbackDisqus(){
	(function() {
		var d = document, s = d.createElement('script');

		s.src = '//rupinderjeet.disqus.com/embed.js';

		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
		})();
}

function sendContactEmail(){
	message = $("#contact-form").serialize();
	$.ajax({
			url: "//formspree.io/rupinderjeet47@gmail.com", 
			method: "POST",
			data: {
				message: message
			},
			dataType: "json"
	});
	
	$('#handy-contact-form').slideUp('fast');
	$('#handy-contact-form-thanks').slideDown('fast');
//	alert(message);
	return false;
}

window.onload = function () {
	'use strict';
	$("#home-slide").load("html/home.html", null, null);
};

//GLOBAL VARIABLES
var slideShow;

//SETTINGS
function settings() {
	'use strict';
}