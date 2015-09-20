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

  //FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
  function autoPlayYouTubeModal() {

      var trigger = $("body").find('[data-toggle="modal"]');
      trigger.click(function () {
          var theModal = $(this).data("target"),
              videoSRC = $(this).attr("data-theVideo"),
              videoSRCauto = videoSRC + "?autoplay=1";
          $(theModal + ' iframe').attr('src', videoSRCauto);
          $(theModal + ' button.close').click(function () {
              $(theModal + ' iframe').attr('src', videoSRC);
          });
          $('.modal').click(function () {
              $(theModal + ' iframe').attr('src', videoSRC);
          });
      });
  }
  function interfaces(){
  	// Affix
  	$nav.affix({ offset: { top: $intro.height() } });

  	// Scroll Spy
  	$('body').scrollspy({ target: '.navbar-ex1-collapse' });

  	// Detect mobile; Activate appropriate class.
  	if (!!isMobile.android.phone ||
        !!isMobile.apple.phone ||
        !! isMobile.other.device ){
  		$('html').addClass('mobile');
  	} else {
  		$('html').addClass('no-mobile');
    }

  	// Activate video play posters
  	$('.video-play').on('click touchstart mousedown', function(e){
  		$(e.currentTarget).hide(100);
  		toggleVideo($(this).siblings('video'));
  	});
    autoPlayYouTubeModal();
  }

  $doc.ready(function(){
  	interfaces();
  	setTimeout(updateScrollSpy, 500);
  });
}());
