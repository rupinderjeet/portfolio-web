jQuery(function( $ ){
	$.localScroll.defaults.axis = 'x';
	$.localScroll({
		target: '#content', queue:true, duration:1000, hash:true,
		onBefore:function( e, anchor, $target ){},
		onAfter:function( anchor, settings ){}
	});
});