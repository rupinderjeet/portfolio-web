document.cookie = 'ppkcookie1=test cookie 1; expires=Thu, 2 Aug 2016 20:47:11 UTC; path=/'
document.cookie = 'ppkcookie2=test cookie 2; expires=Thu, 2 Aug 2016 20:47:11 UTC; path=/'
document.cookie = 'ppkcookie2=test 2 cookie 2; expires=Thu, 2 Aug 2016 20:47:11 UTC; path=/'

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

