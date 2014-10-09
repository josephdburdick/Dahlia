'use strict';

var $doc   = $(document),
	$win   = $(window),
	$intro = $('#intro'),
	$bgVid = $('#bgVid'),
	$nav   = $('nav[role="navigation"]'),
	bgVidMaxOpacity = 0.4,
	isMobile = isMobile,
	ww = function() {return $win.width()};


function intro(){
	$bgVid.addClass('active');
	$intro.find('.content').children().each(function(){
		$(this).addClass('active');
	});
	var ipad = navigator.userAgent.match(/iPad/i) != null;
	if (ipad) $('html').addClass('ipad');
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

	// Trigger mobile menu to close once a link is touched.
	if (Modernizr.touch && isMobile.any == true){
		$('.navbar-ex1-collapse a').on('click', function(){
			$('button.navbar-toggle').trigger('click');
		});
	}
	
	// Detect mobile; Activate appropriate class.
	if ((isMobile.android.phone || isMobile.apple.phone || isMobile.other.device ) == true)
		$('html').addClass('mobile');
	else
		$('html').addClass('no-mobile');

	// Pause videos on carousel slide
	$('.carousel').carousel('pause').on('slid.bs.carousel', function (e) {
		var $activeSlide = $(e.currentTarget).find('.item.active'),
			videos = $('.carousel').find('video');
		$(videos).each(function(i, el){
			el.pause();
		});
	});

	// Activate video play posters
	$('.video-play').on('click touchstart mousedown', function(e){
		$(e.currentTarget).hide(100);
		toggleVideo($(this).siblings('video'));
	});


	// Window scroll fadeout hero
	$(window).bind('scroll', function(){

		var ratio = function(){
			var alg = (($win.scrollTop() - $intro.outerHeight()) / -1200);
			if (alg > 0){ return alg; }
			else if (alg > bgVidMaxOpacity){
				return bgVidMaxOpacity;
			}
			else{ return 0; }
		};
		$bgVid.css('opacity', ratio());
		if ($win.scrollTop() > $intro.height()) {
			$bgVid.find('video').get(0).pause();
	  } else {
	  	$bgVid.find('video').get(0).play();
	  	$(window).trigger('resize');
	  }
	}).trigger('scroll');
}



$doc.ready(function(){
	intro();
	interfaces();
});


