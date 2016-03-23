function showNextImage(type, clicktype){
	
	//@type = 
	var imgCount = 0;
	var display = false;
	
	if(type === undefined){
		type = "forward";
	}
	
	for(var i=1; i<6; i++){
		display = document.getElementById('pic-' + i).getAttribute('class').indexOf('no-display') === -1;		//tells that this image is displaying right now
		if(display){
			document.getElementById('pic-' + i).setAttribute('class', document.getElementById('pic-' + i).getAttribute('class').replace('display', 'no-display'));
			
			if(type === 'forward'){
				if(i === 5){ i = 0; }
				document.getElementById('pic-' + (parseInt(i)+1)).setAttribute('class', document.getElementById('pic-' + (parseInt(i)+1)).getAttribute('class').replace('no-display', 'display'));
			} else if(type === 'backward'){
				if(i === 1){ i = 6; }
				document.getElementById('pic-' + (parseInt(i)-1)).setAttribute('class', document.getElementById('pic-' + (parseInt(i)-1)).getAttribute('class').replace('no-display', 'display'));
			}
			
			if(clicktype !== undefined && clicktype === "btnclick"){
				changeSlideShowState('pause', document.getElementById('slideshow-btn'));
			}
			
			break;
		}
	}
}

function changeSlideShowState(type, element){
	if(element !== undefined){
		if(type === "play"){
			element.innerHTML = "pause";
			element.setAttribute('onclick', element.getAttribute('onclick').replace('play', 'pause'));
		} else if(type === "pause") {
			element.innerHTML = "play";
			element.setAttribute('onclick', element.getAttribute('onclick').replace('pause', 'play'));
		}
	}
	
	if(type === "play"){
		slideShow = setInterval(showNextImage, 1000);
	} else if (type === "pause"){
		clearInterval(slideShow);
	}
}

function btnClick(source, btn){
	if(source === 'bar'){
		$('.TF5FD').addClass('btn-default');
		$('.TF5FD').removeClass('active-button');
		$(btn).removeClass('btn-default');
		$(btn).addClass('active-button');
	}
}



window.onload = function(){
	changeSlideShowState('pause', document.getElementById('slideshow-btn'));
	
}

//GLOBAL VARIABLES
var slideShow;

//SETTINGS
function settings(){
	
}