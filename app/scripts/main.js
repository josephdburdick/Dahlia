/*global isMobile:true */
/*global alert:true */

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
    if (!!$('[data-spy="scroll"]')){
      $('[data-spy="scroll"]').each(function () {
      	$(this).scrollspy('refresh');
      });
    }
  }
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
      trigger.click(function () {
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
      });
  }
  function contactForm(){
    var $form = $('#form-contact');
    var $btnSubmit = $('#form-submit');
    $btnSubmit.on('click', function(e){
      e.preventDefault();

      if (!$form.find('[required]').val()){
        alert('Please fill out all fields in contact form to send.');
      } else {
        $('#msgSubmit').removeClass('hidden').show();
        setTimeout(function(){
          $form.submit();
        }, 300);
      }
    });
    $('#form-contact input, #form-contact textarea').on('blur keyup', function(){
      if( !$(this).val() ) {
        $(this).closest('.form-group').addClass('has-error');
      } else {
        $(this).closest('.form-group').removeClass('has-error');
      }
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
    contactForm();
  }

  $doc.ready(function(){
  	interfaces();
  	setTimeout(updateScrollSpy, 500);
  });
})();
