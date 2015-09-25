/*global Modernizr:false */
/*global isMobile:true */

(function () {
  'use strict';
  var $doc   = $(document),
    	$intro = $('#intro'),
    	$nav   = $('nav[role="navigation"]');

  $('textarea').keyup(function() {
    while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css('borderTopWidth')) + parseFloat($(this).css('borderBottomWidth'))) {
      $(this).height($(this).height()+1);
    }
  });

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

      var trigger = $('body').find('[data-toggle="modal"]'),
          theModal = $('#videoModal'),
          videoSRC,
          iframe = $('iframe');
      $(theModal).on('shown.bs.modal', function () {
        $(iframe).focus();
      });
      $(theModal).on('hide.bs.modal', function () {
        $(iframe).remove();
      });
      trigger.click(function (e) {
        videoSRC = $(this).attr('data-theVideo');
        if (!$('.modal iframe').length){
          $(theModal).find('.embed-container').append(iframe);
        }
        $(theModal).find('iframe').attr({
            'allowfullscreen': true,
            'src': videoSRC + 'html5=1&enablejsapi=1',
            'frameBorder': 0,
            'width' : '100%'
        });
        $('.modal button.close').click(function () {
            $(theModal).find('iframe').remove();
        });

        // $('.modal').click(function (e) {
        //     $('#' + e.currentTarget + ' iframe').attr('src', videoSRC);
        // });
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
