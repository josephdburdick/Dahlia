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
	$('.carousel').carousel('pause').on('slid.bs.carousel', function (e) {
		var $activeSlide = $(e.currentTarget).find('.item.active'),
  		video = $activeSlide.find('video')[0];
  		// pause if playing.
	});

	$('#work-gallery video').fitVids();
	$('.video-play').on('click', function(e){
		$(this).hide();
		toggleVideo($(this).siblings('video'));
	});

	// Window scroll fadeout hero
	$(window).bind('scroll', function(){

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
	  	$(window).trigger('resize');
	  }
	}).trigger('scroll');
}



$doc.ready(function(){
	intro();
	interfaces();
});


