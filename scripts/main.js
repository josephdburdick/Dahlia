!function(){"use strict";function t(t){var o=t.get(0);t.visible(!0)&&(o.paused?(o.play(),t.addClass("active")):(o.pause(),t.removeClass("active")))}function o(){$('[data-spy="scroll"]')&&$('[data-spy="scroll"]').each(function(){$(this).scrollspy("refresh")})}function e(){var t,o=$("body").find('[data-toggle="modal"]'),e=$("#videoModal"),i=$("iframe");$(e).on("shown.bs.modal",function(){$(i).focus()}),$(e).on("hide.bs.modal",function(){$(i).remove()}),o.click(function(){t=$(this).attr("data-theVideo"),$(".modal iframe").length||$(e).find(".embed-container").append(i),$(e).find("iframe").attr({allowfullscreen:!0,src:t+"html5=1&enablejsapi=1",frameBorder:0,width:"100%"}),$(".modal button.close").click(function(){$(e).find("iframe").remove()})})}function i(){var t=$("#form-contact"),o=$("#form-submit");o.on("click",function(o){o.preventDefault(),t.find("[required]").val()?($("#msgSubmit").removeClass("hidden").show(),setTimeout(function(){t.submit()},300)):alert("Please fill out all fields in contact form to send.")}),$("#form-contact input, #form-contact textarea").on("blur keyup",function(){$(this).val()?$(this).closest(".form-group").removeClass("has-error"):$(this).closest(".form-group").addClass("has-error")})}function a(){r.affix({offset:{top:n.height()}}),$("body").scrollspy({target:".navbar-ex1-collapse"}),isMobile.android.phone||isMobile.apple.phone||isMobile.other.device?$("html").addClass("mobile"):$("html").addClass("no-mobile"),$(".video-play").on("click touchstart mousedown",function(o){$(o.currentTarget).hide(100),t($(this).siblings("video"))}),e(),i()}var s=$(document),n=$("#intro"),r=$('nav[role="navigation"]');$("textarea").keyup(function(){for(;$(this).outerHeight()<this.scrollHeight+parseFloat($(this).css("borderTopWidth"))+parseFloat($(this).css("borderBottomWidth"));)$(this).height($(this).height()+1)}),s.ready(function(){a(),setTimeout(o,500)})}();