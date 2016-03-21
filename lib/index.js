function showNextImage(type){
	var imgCount = 0;
	var display = false;
	
	if(type === undefined){
		type = "forward";
	}
	
	for(var i=1; i<6; i++){
		display = document.getElementById('pic-' + i).getAttribute('class').indexOf('no-display') === -1;
		if(display){
			document.getElementById('pic-' + i).setAttribute('class', document.getElementById('pic-' + i).getAttribute('class').replace('display', 'no-display'));
			
			if(type === 'forward'){
				if(i === 5){ i = 0; }
				document.getElementById('pic-' + (parseInt(i)+1)).setAttribute('class', document.getElementById('pic-' + (parseInt(i)+1)).getAttribute('class').replace('no-display', 'display'));
			} else if(type === 'backward'){
				if(i === 1){ i = 6; }
				document.getElementById('pic-' + (parseInt(i)-1)).setAttribute('class', document.getElementById('pic-' + (parseInt(i)-1)).getAttribute('class').replace('no-display', 'display'));
			}
			
			break;
		}
	}
	
	console.log(imgCount++)
}

window.onload = function(){
	var autoShow = setInterval(showNextImage, 1000);
}