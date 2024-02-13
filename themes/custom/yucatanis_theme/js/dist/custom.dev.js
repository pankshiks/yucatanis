"use strict";

$('.marquee_text').marquee({
  direction: 'left',
  duration: 50000,
  gap: 50,
  delayBeforeStart: 0,
  duplicated: true,
  startVisible: true
});
$(".tab_content").hide();
$(".tab_content:first").show();
/* if in tab mode */

$("ul.tabs li").click(function () {
  $(".tab_content").hide();
  var activeTab = $(this).attr("rel");
  $("#" + activeTab).fadeIn();
  $("ul.tabs li").removeClass("active");
  $(this).addClass("active");
  $(".tab_drawer_heading").removeClass("d_active");
  $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");
});
/* if in drawer mode */

$(".tab_drawer_heading").click(function () {
  $(".tab_content").hide();
  var d_activeTab = $(this).attr("rel");
  $("#" + d_activeTab).fadeIn();
  $(".tab_drawer_heading").removeClass("d_active");
  $(this).addClass("d_active");
  $("ul.tabs li").removeClass("active");
  $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
});
$('ul.tabs li').last().addClass("tab_last");
$(".slick-slider").slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  prevArrow: '<button class="slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }]
});
$(".catergory-slider").slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  margin: 24,
  slidesToShow: 4.5,
  initialSlide: 0.5,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      initialSlide: 0.5,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      initialSlide: 0.5,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      initialSlide: 0.5,
      arrows: false,
      dots: false
    }
  }]
}); // $(".detailed-cards-slider").slick({
//     autoplay: true,
//     autoplaySpeed: 2000,
//     arrows: true,
//     dots: false,
//     infinite: true,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
//     nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
//     responsive: [
//         {
//             breakpoint: 991,
//             settings: {
//                 slidesToShow: 3,
//                 arrows: false,
//                 dots: false,
//             }
//         },
//         {
//             breakpoint: 767,
//             settings: {
//                 slidesToShow: 1,
//                 arrows: false,
//                 dots: false,
//             }
//         }
//     ]
// });

$(".testimonial-cards-slider").slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 991,
    settings: {
      slidesToShow: 2,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
}); // hambruger menu

$("#menuToggle").on("click", function () {
  $(".fullscreen").toggleClass("active").removeClass("reverse_anim");
});
$(".close").on("click", function () {
  $(".fullscreen").toggleClass("reverse_anim");
});
$('#cultural-experiences').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
});
$('#detailed-cards-2').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
});
$('#detailed-cards-3').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
});
$('#detailed-cards-4').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
});
$('#detailed-cards-5').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
});
$('#detailed-cards-6').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
});
$('#detailed-cards-7').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
});
$('#detailed-cards-8').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
});
$('#detailed-cards-9').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
});
$('#detailed-cards-10').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
});
$('#detailed-cards-11').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
});
$('#detailed-cards-12').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
  nextArrow: '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
      arrows: true,
      dots: false
    }
  }, {
    breakpoint: 991,
    settings: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }, {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      arrows: false,
      dots: false
    }
  }]
}); // select box js

$(".select-mood-box").click(function () {
  $(".select-mood-box ").removeClass("select-box-active");
  $(this).addClass("select-box-active");
});
$(window).scroll(function () {
  if ($(this).scrollTop() > 80) {
    $('.header-bar').addClass("sticky");
  } else {
    $('.header-bar').removeClass("sticky");
  }
}); // catergorization slider

$(".carouselTicker").carouselTicker();
$(".carouselTicker3").carouselTicker({});
$(".carouselTicker2").carouselTicker({
  direction: "next"
});