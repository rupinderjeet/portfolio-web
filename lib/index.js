/*jslint browser:true */

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

function btnClick(source, btn) { /* TF5FD is a special-empty-class used to target menu-bar-buttons only */
	'use strict';
	if (source === 'bar') {
		$('.TF5FD').addClass('btn-default');
		$('.TF5FD').removeClass('btn-focused');
		$(btn).removeClass('btn-default');
		$(btn).addClass('btn-focused');
	}
}

function expandItem(element) {
	'use strict';
	
	//@itemstate: expanded, collapsed(default)
	
	$(element).removeClass('col-md-3');
	$(element).addClass('col-md-12');
}

function initDisqus(){
	(function() {
		var d = document, s = d.createElement('script');

		s.src = '//rupinderjeet.disqus.com/embed.js';

		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
		})();
}

window.onload = function () {
	'use strict';
	changeSlideShowState('pause', document.getElementById('slideshow-btn'));
	initDisqus();
};

//GLOBAL VARIABLES
var slideShow;

//SETTINGS
function settings() {
	'use strict';
}