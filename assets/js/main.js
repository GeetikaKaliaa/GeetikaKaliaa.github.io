/*-----------------------------------------------------------------------------------

/***************************************************
==================== JS INDEX ======================
****************************************************
// Data js
// Sidebar Navigation
// Sticky Header
// Hamburger Menu
// Scroll To Section
// OnePage Active Class
// Portfolio Filter
// Portfolio Gallery Carousel
// Testimonial Carousel
// Nice Select
// ALL Popup
// Preloader
// Sidebar Hover BG Color
// Services Hover BG
// Portfolio Filter BG Color
// WoW Js

****************************************************/

(function ($) {
	"use strict";

	/*------------------------------------------------------
  /  Data js
  /------------------------------------------------------*/
	$("[data-bg-image]").each(function () {
		$(this).css(
			"background-image",
			"url(" + $(this).attr("data-bg-image") + ")"
		);
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});

	$(document).ready(function ($) {
		/*------------------------------------------------------
  	/  Sticky Header
  	/------------------------------------------------------*/
		var lastScrollTop = 0;
		$(window).scroll(function () {
			var scroll = $(window).scrollTop();

			if (scroll > 300) {
				$(".gk-header-area.header-sticky").addClass("sticky");
				$(".gk-header-area.header-sticky").removeClass("sticky-out");
			} else if (scroll < lastScrollTop) {
				if (scroll < 500) {
					$(".gk-header-area.header-sticky").addClass("sticky-out");
					$(".gk-header-area.header-sticky").removeClass("sticky");
				}
			} else {
				$(".gk-header-area.header-sticky").removeClass("sticky");
			}

			lastScrollTop = scroll;
		});

		/*------------------------------------------------------
  	/  Hamburger Menu
  	/------------------------------------------------------*/
		$(".menu-bar").on("click", function () {
			$(".menu-bar").toggleClass("menu-bar-toggeled");
			$(".header-menu").toggleClass("opened");
			$("body").toggleClass("overflow-hidden");
		});

		$(".header-menu ul li a").on("click", function () {
			$(".menu-bar").removeClass("menu-bar-toggeled");
			$(".header-menu").removeClass("opened");
			$("body").removeClass("overflow-hidden");
		});

		/*------------------------------------------------------
  	/  OnePage Active Class
  	/------------------------------------------------------*/
		$(".header-menu nav ul").onePageNav({
			currentClass: "current-menu-ancestor",
			changeHash: false,
			easing: "swing",
		});

		/*------------------------------------------------------
  	/  Portfolio Filter
  	/------------------------------------------------------*/
		$(".portfolio-box").imagesLoaded(function () {
			var $grid = $(".portfolio-box").isotope({
				// options
				masonry: {
					columnWidth: ".portfolio-box .portfolio-sizer",
					gutter: ".portfolio-box .gutter-sizer",
				},
				itemSelector: ".portfolio-box .portfolio-item",
				percentPosition: true,
			});

			// filter items on button click
			$(".filter-button-group").on("click", "button", function () {
				$(".filter-button-group button").removeClass("active");
				$(this).addClass("active");

				var filterValue = $(this).attr("data-filter");
				$grid.isotope({ filter: filterValue });
			});
		});

	

		
	
		/*------------------------------------------------------
  	/ Brand Slider
  	/------------------------------------------------------*/
		if ($(".brand-slider").length > 0) {
			var brand = new Swiper(".brand-slider", {
				slidesPerView: 6,
				spaceBetween: 30,
				loop: false,
				breakpoints: {
					320: {
						slidesPerView: 2,
					},
					576: {
						slidesPerView: 3,
					},
					640: {
						slidesPerView: 3,
					},
					768: {
						slidesPerView: 4,
					},
					992: {
						slidesPerView: 5,
					},
					1024: {
						slidesPerView: 6,
					},
				},
			});
		}

		/*------------------------------------------------------
  	/  Nice Select
  	/------------------------------------------------------*/
		$("select").niceSelect();

		/*------------------------------------------------------
  	/  ALL Popup
  	/------------------------------------------------------*/
		if ($(".popup_video").length > 0) {
			$(`.popup_video`).lightcase({
				transition: "elastic",
				showSequenceInfo: false,
				slideshow: false,
				swipe: true,
				showTitle: false,
				showCaption: false,
				controls: true,
			});
		}

		$(".modal-popup").magnificPopup({
			type: "inline",
			fixedContentPos: false,
			fixedBgPos: true,
			overflowY: "auto",
			closeBtnInside: true,
			preloader: false,
			midClick: true,
			removalDelay: 300,
			mainClass: "popup-mfp",
		});
	});

	$(window).on("load", function () {
		/*------------------------------------------------------
  	/  WoW Js
  	/------------------------------------------------------*/
		var wow = new WOW({
			boxClass: "wow", // default
			animateClass: "animated", // default
			offset: 100, // default
			mobile: true, // default
			live: true, // default
		});
		wow.init();

			/*------------------------------------------------------
  	/  Preloader
  	/------------------------------------------------------*/
	  const svg = document.getElementById("preloaderSvg");
	  const svgText = document.querySelector(
		  ".hero-section .intro_text svg text"
	  );
	  const tl = gsap.timeline({
		  onComplete: startStrokeAnimation,
	  });
	  const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
	  const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

	  tl.to(".preloader-heading .load-text , .preloader-heading .cont", {
		  delay: 1.5,
		  y: -100,
		  opacity: 0,
	  });
	  tl.to(svg, {
		  duration: 0.5,
		  attr: { d: curve },
		  ease: "power2.easeIn",
	  }).to(svg, {
		  duration: 0.5,
		  attr: { d: flat },
		  ease: "power2.easeOut",
	  });
	  tl.to(".preloader", {
		  y: -1500,
	  });
	  tl.to(".preloader", {
		  zIndex: -1,
		  display: "none",
	  });

	  function startStrokeAnimation() {
		  // Add a class or directly apply styles to trigger the stroke animation
		  svgText.classList.add("animate-stroke");
	  }

		/*------------------------------------------------------
  	/  Services Hover BG
  	/------------------------------------------------------*/
		function service_animation() {
			var active_bg = $(".services-widget .active-bg");
			var element = $(".services-widget .current");
			$(".services-widget .service-item").on("mouseenter", function () {
				var e = $(this);
				activeService(active_bg, e);
			});
			$(".services-widget").on("mouseleave", function () {
				element = $(".services-widget .current");
				activeService(active_bg, element);
				element.closest(".service-item").siblings().removeClass("mleave");
			});
			activeService(active_bg, element);
		}
		service_animation();

		function activeService(active_bg, e) {
			if (!e.length) {
				return false;
			}
			var topOff = e.offset().top;
			var height = e.outerHeight();
			var menuTop = $(".services-widget").offset().top;
			e.closest(".service-item").removeClass("mleave");
			e.closest(".service-item").siblings().addClass("mleave");
			active_bg.css({ top: topOff - menuTop + "px", height: height + "px" });
		}

		$(".services-widget .service-item").on("click", function () {
			$(".services-widget .service-item").removeClass("current");
			$(this).addClass("current");
		});

		/*------------------------------------------------------
  	/  Portfolio Filter BG Color
  	/------------------------------------------------------*/
		function filter_animation() {
			var active_bg = $(".portfolio-filter .button-group .active-bg");
			var element = $(".portfolio-filter .button-group .active");
			$(".portfolio-filter .button-group button").on("click", function () {
				var e = $(this);
				activeFilterBtn(active_bg, e);
			});
			activeFilterBtn(active_bg, element);
		}
		filter_animation();

		function activeFilterBtn(active_bg, e) {
			if (!e.length) {
				return false;
			}
			var leftOff = e.offset().left;
			var width = e.outerWidth();
			var menuLeft = $(".portfolio-filter .button-group").offset().left;
			e.siblings().removeClass("active");
			e.closest("button")
				.siblings()
				.addClass(".portfolio-filter .button-group");
			active_bg.css({ left: leftOff - menuLeft + "px", width: width + "px" });
		}

	

		// Form Validation
		/* contact form */
		if ($("#contact-form").length > 0) {
			$("#contact-form").validate({
				rules: {
					conName: "required",
					conEmail: {
						required: true,
						email: true,
					},
				},

				messages: {
					conName: "Enter your name.",
					conEmail: "Enter a valid email.",
				},
				submitHandler: function (form) {
					// start ajax request
					$.ajax({
						type: "POST",
						url: "assets/mail/contact-form.php",
						data: $("#contact-form").serialize(),
						cache: false,
						success: function (data) {
							if (data == "Y") {
								$("#message_sent").modal("show");
								$("#contact-form").trigger("reset");
							} else {
								$("#message_fail").modal("show");
							}
						},
					});
				},
			});
		}
		/* !contact form */
	});
})(jQuery);


// Scroll up
var progressPath = document.querySelector('.progress-wrap path');
02
var pathLength = progressPath.getTotalLength();
03
 
04
progressPath.style.transition = progressPath.style.WebkitTransition ='none';
05
progressPath.style.strokeDasharray = pathLength +' ' + pathLength;
06
progressPath.style.strokeDashoffset = pathLength;
07
progressPath.getBoundingClientRect();
08
progressPath.style.transition = progressPath.style.WebkitTransition ='stroke-dashoffset 10ms linear';
09
 
10
var up<a href="https://www.jqueryscript.net/time-clock/">date</a>Progress =function () {
11
  var scroll = $(window).scrollTop();
12
  var height = $(document).height() - $(window).height();
13
  var progress = pathLength - scroll * pathLength / height;
14
  progressPath.style.strokeDashoffset = progress;
15
};
16
 
17
updateProgress();
18
 
19
$(window).scroll(updateProgress);
20
 
21
var offset = 50;
22
var duration = 550;
23
 
24
jQuery(window).on('scroll',function () {
25
  if (jQuery(this).scrollTop() > offset) {
26
    jQuery('.progress-wrap').addClass('active-progress');
27
  }else {
28
    jQuery('.progress-wrap').removeClass('active-progress');
29
  }
30
});
31
 
32
jQuery('.progress-wrap').on('click',function (event) {
33
  event.preventDefault();
34
  jQuery('html, body').animate({ scrollTop: 0 }, duration);
35
  return false;
36
});