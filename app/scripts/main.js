'use strict';
// isMobile()

var $doc = $(document),
		$win = $(window),
		$intro = $('#intro'),
		$bgVid = $('#bgVid'),
		$nav 	 = $('nav[role="navigation"]');

function intro(){
	$bgVid.addClass('active');
	$intro.find('.content').children().each(function(){
		$(this).addClass('active');
	});
}

function toggleVideo(el){
	var video = el.get(0);
	if (el.visible(true)){
		if (video.paused) {
	    video.play();
	    el.addClass('active');
		} else {
			video.pause();
			el.removeClass('active');
		}
	} else {
		console.log(el + 'not playing');
		video.pause();
	}
	console.log(video.paused)
}

function interfaces(){
	// $win.on('DOMContentLoaded load resize scroll', toggleVideo($bgVid))
	// 	.trigger('scroll');

	$nav.affix({
		offset: {
			top: $intro.height() - $nav.height()
		}
	});
	$('body').scrollspy({ target: '.navbar-ex1-collapse' });

	$('video').on('click',function(){
		toggleVideo($(this));
	});
}



$doc.ready(function(){
	intro();
	interfaces();
	$(window).on('scroll', toggleVideo($bgVid)).trigger('scroll');
});
