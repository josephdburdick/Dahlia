'use strict';
// isMobile()

var $doc = $(document),
		$win = $(window),
		$intro = $('#intro'),
		$bgVid = $('#bgVid'),
		$nav 	 = $('nav[role="navigation"]'),

		bgVidMaxOpacity = 0.4; 

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
	}
}

function interfaces(){
	// Affix
	$nav.affix({
		offset: {
			top: $intro.height() - $nav.height()
		}
	});

	// Scroll Spy
	$('body').scrollspy({ target: '.navbar-ex1-collapse' });

	// Video playback toggle
	$('video').on('click',function(e){
		toggleVideo($(this), e);
	});

	$('.vid').on('click', function(){
		$(this).fadeOut(200).parent('.vid-container').toggleClass('active');
		toggleVideo($($(this).closest('video')));
	})

	// Window scroll fadeout hero
	$win.on('scroll', function(){
		var ratio = function(){
			var alg = (($win.scrollTop() - $intro.outerHeight()) / -1200);
			if (alg > 0){
				return alg;
			}
			else if (alg > bgVidMaxOpacity){
				return bgVidMaxOpacity;
			}
			else{
				return 0;
			}
		};
		$bgVid.css('opacity', ratio());
		if ($win.scrollTop() > $intro.height()) {
			$bgVid.get(0).pause();
	  } else {
	  	$bgVid.get(0).play();
	  }
	}).trigger('scroll');
}



$doc.ready(function(){
	intro();
	interfaces();
});


