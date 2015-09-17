/*global Modernizr:true */
/*global isMobile:true */

(function () {
  'use strict';
  var $doc   = $(document),
    	$intro = $('#intro'),
    	// $bgVid = $('#bgVid'),
    	$nav   = $('nav[role="navigation"]');
    	// bgVidMaxOpacity = 0.4

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

  function updateScrollSpy() {
      $('[data-spy="scroll"]').each(function () {
      	$(this).scrollspy('refresh');
      });
  }

  function interfaces(){
  	// Affix
  	$nav.affix({ offset: { top: $intro.height() } });

  	// Scroll Spy
  	$('body').scrollspy({ target: '.navbar-ex1-collapse' });

  	// Trigger mobile menu to close once a link is touched.
  	if (Modernizr.touch && isMobile.any === true){
  		$('.navbar-ex1-collapse a').on('click', function(){
  			$('button.navbar-toggle').trigger('click');
  		});
  	}

  	// Detect mobile; Activate appropriate class.
  	if ((isMobile.android.phone || isMobile.apple.phone || isMobile.other.device ) === true){
  		$('html').addClass('mobile');
  	}
  	else{
  		$('html').addClass('no-mobile');
  	}

  	// Pause videos on carousel slide
  	$('.carousel').carousel('pause')
  		.on('slid.bs.carousel', function (e) {
  			var video = $(e.currentTarget).find('.item video');
  			$(video).each(function(i, el){
  				el.pause();
  			});
  		});

  	// Activate video play posters
  	$('.video-play').on('click touchstart mousedown', function(e){
  		$(e.currentTarget).hide(100);
  		toggleVideo($(this).siblings('video'));
  	});

  }

  $doc.ready(function(){
  	interfaces();
  	setTimeout(updateScrollSpy, 500);
  });
}());
