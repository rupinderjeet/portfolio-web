/*jslint browser:true */
var feedbackInterval;
var mail;

function getElement(id){
	return document.getElementById(id);
}

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
	
	var btnText = $(btn).html().trim().toLowerCase();
	if (btnText !== "feedback") {
		$("#" + btnText + "-slide").load("html/" + btnText + ".html", null, null);
	}
	
	if (source === 'bar') {
		/* 'btn-bar' is a special-empty-class used to target menu-bar-buttons only */
		
		$('.btn-bar').addClass('btn-default');
		$('.btn-bar').removeClass('btn-focused');
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
		clearInterval(feedbackInterval); 								//In case, if it is already counting
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

function initFeedbackDisqus() {
	'use strict';
	(function () {
		var d = document, s = d.createElement('script');

		s.src = '//rupinderjeet.disqus.com/embed.js';

		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
	})();
}

/* Handy Contact Form */
function sendContactEmail(){
	$('#handy-contact-form-error').slideUp('fast');

	'use strict';
	var userName = $('#user-name').val();
	var userEmail = $('#user-email').val();
	var userTwitter = $('#user-twitter').val();
	var userWhatsapp = $('#user-whatsapp').val();
	var userMessage = $('#user-message').val();
	var enquiryType = $('#enq-type').val();
	var gotcha = $('#gotcha').val();

	if(userTwitter === ""){
		userTwitter = "Not Provided";
	}

	if(userWhatsapp === ""){
		userWhatsapp = "Not Provided";
	}

	var error = (userName.trim().length < 2 || userEmail.trim().length < 4 || userEmail.trim().indexOf("@") === (-1)
	|| userEmail.trim().indexOf(".") === (-1) || userMessage.trim().length < 10);

	if(error){
		$('#handy-contact-form-error').slideDown('fast');
	} else {
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
				$('#handy-contact-form').remove();
				$('#handy-contact-form-thanks').remove();
				$('#handy-form-btn').html("Error! Try again Later");
			},
			success: function (data) {
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

/* Report An Issue */
function reportIssue(submitBtn){
	$('#report-issue-error').slideUp('fast');
	$('#report-issue-server-error').slideUp('fast');

	'use strict';
	var reporterName = $('#reporter-name').val();
	var reporterEmail = $('#reporter-email').val();
	var issueTitle = $('#report-issue-title').val();
	var issueDetails = $('#report-issue-description').val();
	var gotcha = $('#gotcha').val();

	var error = (reporterName.trim().length < 2 || reporterEmail.trim().length < 4 || reporterEmail.trim().indexOf("@") === (-1)
	|| reporterEmail.trim().indexOf(".") === (-1) || issueTitle.trim().length < 5 || issueDetails.trim().length < 20);

	if(error){
		$('#report-issue-error').slideDown('fast');
	} else {
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
				$('#report-issue-input').slideUp('fast');
				$('#report-issue-thanks').slideUp('fast');
				$('#report-issue-server-error').slideDown('fast');
				$(submitBtn).hide('fast');
			},
			success: function (data) {
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

function arrowAnimation(){
    $('#links').slideToggle('fast');
    $('#arrow').toggleClass('glyphicon-chevron-down');
    $('#arrow').toggleClass('glyphicon-chevron-up');
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