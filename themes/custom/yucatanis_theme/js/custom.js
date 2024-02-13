jQuery(".marquee_text").marquee({
    direction: "left",
    duration: 50000,
    gap: 50,
    delayBeforeStart: 0,
    duplicated: true,
    startVisible: true,
});

jQuery(".tab_content").hide();
jQuery(".tab_content:first").show();

/* if in tab mode */
jQuery("ul.tabs li").click(function () {
    jQuery(".tab_content").hide();
    var activeTab = jQuery(this).attr("rel");
    jQuery("#" + activeTab).fadeIn();

    jQuery("ul.tabs li").removeClass("active");
    jQuery(this).addClass("active");

    // jQuery(".tab_drawer_heading").removeClass("d_active");
    // jQuery(".tab_drawer_heading[rel^='" + activeTab + "']").addClass(
    //     "d_active"
    // );
    var $tabDrawerHeadings = jQuery(".tab_drawer_heading");
    if ($tabDrawerHeadings.length > 0) {
        $tabDrawerHeadings.removeClass("d_active");
        $tabDrawerHeadings
            .filter("[rel^='" + activeTab + "']")
            .addClass("d_active");
    }
});

/* if in drawer mode */
jQuery(".tab_drawer_heading").click(function () {
    jQuery(".tab_content").hide();
    var d_activeTab = jQuery(this).attr("rel");
    jQuery("#" + d_activeTab).fadeIn();

    jQuery(".tab_drawer_heading").removeClass("d_active");
    jQuery(this).addClass("d_active");

    jQuery("ul.tabs li").removeClass("active");
    jQuery("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
});

jQuery("ul.tabs li").last().addClass("tab_last");

jQuery(".slick-slider").slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: '<button class="slide-arrow prev-arrow"></button>',
    nextArrow: '<button class="slide-arrow next-arrow"></button>',
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                arrows: true,
                dots: false,
            },
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
                arrows: false,
                dots: false,
            },
        },
         {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                arrows: false,
                dots: false,
            },
        },
    ],
});

//6nov
jQuery(".tabs-slider").slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '<button class="slide-arrow prev-arrow"></button>',
    nextArrow: '<button class="slide-arrow next-arrow"></button>',
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                arrows: true,
                dots: false,
            },
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
                arrows: true,
                dots: false,
            },
        },
    ],
});

// hambruger menu
jQuery("#menuToggle").on("click", () => {
    jQuery(".fullscreen").toggleClass("active").removeClass("reverse_anim");
});

jQuery(".close").on("click", () => {
    jQuery(".fullscreen").toggleClass("reverse_anim");
});

jQuery("#cultural-experiences").slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow:
        '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
    nextArrow:
        '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 1,
                arrows: true,
                dots: false,
            },
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                arrows: false,
                dots: false,
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                arrows: false,
                dots: false,
            },
        },
    ],
});
//start

//end

jQuery("#rental-gear").slick({
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow:
        '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
    nextArrow:
        '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 1,
                arrows: true,
                dots: false,
            },
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 1,
                arrows: false,
                dots: false,
            },
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                arrows: false,
                dots: false,
            },
        },
    ],
});

// select box js
jQuery(".select-mood-box").click(function () {
    jQuery(".select-mood-box ").removeClass("select-box-active");
    jQuery(this).addClass("select-box-active");
});

jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 80) {
        jQuery(".header-bar").addClass("sticky");
    } else {
        jQuery(".header-bar").removeClass("sticky");
    }
});
// catergorization slider
// jQuery(".carouselTicker").carouselTicker();

// jQuery(".carouselTicker3").carouselTicker({});
// jQuery(".carouselTicker2").carouselTicker({
//     direction: "next",
// });

//img slider
jQuery(".carouselTicker-img").carouselTicker();

jQuery(".carouselTicker-img-1").carouselTicker({
    direction: "next",
});

// select box js
jQuery(".select-mood-box").click(function () {
    jQuery(".select-mood-box ").removeClass("select-box-active");
    jQuery(this).addClass("select-box-active");
});

jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 80) {
        jQuery(".header-bar").addClass("sticky");
    } else {
        jQuery(".header-bar").removeClass("sticky");
    }
});

// Price Range slider
function getVals() {
    // Get slider values
    let parent = this.parentNode;
    let slides = parent.getElementsByTagName("input");
    let slide1 = parseFloat(slides[0].value);
    let slide2 = parseFloat(slides[1].value);
    // Neither slider will clip the other, so make sure we determine which is larger
    if (slide1 > slide2) {
        let tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
    }

    let displayElement = parent.getElementsByClassName("rangeValues")[0];
    displayElement.innerHTML = "jQuery" + slide1 + " - jQuery" + slide2;
}

window.onload = function () {
    // Initialize Sliders
    let sliderSections = document.getElementsByClassName("range-slider");
    for (let x = 0; x < sliderSections.length; x++) {
        let sliders = sliderSections[x].getElementsByTagName("input");
        for (let y = 0; y < sliders.length; y++) {
            if (sliders[y].type === "range") {
                sliders[y].oninput = getVals;
                // Manually trigger event first time to display values
                sliders[y].oninput();
            }
        }
    }
};
jQuery(document).ready(function () {
    jQuery(document).scroll(function (e) {
        var scrollTop = jQuery(window).scrollTop();
        if (scrollTop > 180) {
            scrollTop = 180;
        }
        jQuery(".item").css("top", "-" + scrollTop + "px");
    });
    jQuery(".triangle").click(function () {
        if (jQuery("#video").get(0).paused) {
            jQuery("#video").trigger("play");
            jQuery(".triangle").fadeOut(500);
        } else {
            jQuery("#video").trigger("pause");
            jQuery(".triangle").fadeIn(500);
        }
    });
});

// jQuery(document).ready(function () {
//     jQuery('.ui-group .button').on('click', function () {
//         jQuery(".blog-fliter").addClass('all-items');
//     });
// });
jQuery(document).ready(function () {
    jQuery(".blog-fliter .button-group .button:first-child").click(function () {
        jQuery(this).parent().parent().parent().addClass("all-items");
    });

    jQuery(".blog-fliter .button-group .button:not(:first-child)").click(
        function () {
            jQuery(this).parent().parent().parent().removeClass("all-items");
        }
    );

    jQuery(".filter-btn").click(function () {
        jQuery(".filter-listing").slideToggle();
    });
});

jQuery(function () {
    jQuery('input[name="daterange"]').daterangepicker(
        {
            opens: "left",
        },
        function (start, end, label) {
            console.log(
                "A new date selection was made: " +
                    start.format("YYYY-MM-DD") +
                    " to " +
                    end.format("YYYY-MM-DD")
            );
        }
    );
});
//
("use strict");
//
var elementId = jQuery("#typewriter1").attr("id");
if (elementId === "typewriter1") {
    // var text = jQuery(".top-header-bar,.animate").text();
    var text = jQuery("#bannertext").text();
    var sp = text.split(",");
    var values = [];
    jQuery.each(sp, function (index, value) {
        values.push(value.replace(/\n/g, " "));
    });

    var trimmedArray = jQuery.map(values, function (value) {
        return jQuery.trim(value);
    });

    let listText = trimmedArray;

    const type = document.querySelector("#typewriter1");

    let index = -1;
    let current = 0;

    function typeTextFunc() {
        if (current === listText.length) {
            current = 0;
        }
        let typeText = setInterval(() => {
            if (index == listText[current].length - 1) {
                clearInterval(typeText);
                setTimeout(clearTextFunc, 500); // Delay clearing text after typing
            } else {
                index++;
                type.textContent += listText[current][index];
            }
        }, 100);
    }

    function clearTextFunc() {
        let clearText = setInterval(() => {
            if (type.textContent.length == 0) {
                clearInterval(clearText);
                index = -1;
                current++;
                setTimeout(typeTextFunc, 500); // Delay typing next text
            } else {
                type.textContent = type.textContent.slice(0, -1);
            }
        }, 100);
    }

    // typeTextFunc();
}

// if (jQuery(".top-header-bar .animatedText").text() !== "") {
//     // 13-02
//     // The typewriter element
//     var typeWriterElement = document.getElementById('typewriter');

//     // The TextArray: 
//     var textArray = ["Hey, I'm Tim.","I like JavaScript.","I Love to Develop.", "I like this Typewriter."];
//     // function to generate the backspace effect 
//     function delWriter(text, i, cb) {
//     if (i >= 0 ) {
//     typeWriterElement.innerHTML = text.substring(0, i--);
//     // generate a random Number to emulate backspace hitting.
//     var rndBack = 10 + Math.random() * 100;
//     setTimeout(function() {
//         delWriter(text, i, cb);
//     },rndBack); 
//     } else if (typeof cb == 'function') {
//     setTimeout(cb,1000);
//     }
//     };

//     // function to generate the keyhitting effect
//     function typeWriter(text, i, cb) {
//     if ( i < text.length+1 ) {
//     typeWriterElement.innerHTML = text.substring(0, i++);
//     // generate a random Number to emulate Typing on the Keyboard.
//     var rndTyping = 250 - Math.random() * 100;
//     setTimeout( function () { 
//         typeWriter(text, i++, cb)
//     },rndTyping);
//     } else if (i === text.length+1) {
//     setTimeout( function () {
//         delWriter(text, i, cb)
//     },1000);
//     }
//     };

//     // the main writer function
//     function StartWriter(i) {
//     if (typeof textArray[i] == "undefined") {
//     setTimeout( function () {
//         StartWriter(0)
//     },1000);
//     } else if(i < textArray[i].length+1) {
//     typeWriter(textArray[i], 0, function () {
//         StartWriter(i+1);
//     });
//     }  
//     };
//     // wait one second then start the typewriter
//     setTimeout( function () {
//     StartWriter(0);
//     },1000);

//     //13-02 code end

//     //var text = jQuery(".top-header-bar,#animated").text();
//     var text = jQuery("#animated").text();
//     var sp = text.split(",");
//     var values = [];
//     jQuery.each(sp, function (index, value) {
//         values.push(value.replace(/\n/g, " "));
//     });
//     var trimmedArray = jQuery.map(values, function (value) {
//         return jQuery.trim(value);
//     });

//     const type = document.querySelector(".top-header-bar .animatedText");
//     let listTexts = trimmedArray;

//     let index = -1;
//     let current = 0;

//     function typeTextFunc() {
//         console.log(listTexts);
//         if (listTexts !== 'undefined' && current === listTexts.length) {
//             current = 0;
//         }
//         let typeText = setInterval(() => {
//             if (index == listTexts[current].length - 1) {
//                 clearInterval(typeText);
//                 setTimeout(clearTextFunc, 500); // Delay clearing text after typing
//             } else {
//                 index++;
//                 type.textContent += listTexts[current][index];
//             }
//         }, 100);
//     }

//     function clearTextFunc() {
//         let clearText = setInterval(() => {
//             if (type.textContent.length == 0) {
//                 clearInterval(clearText);
//                 index = -1;
//                 current++;
//                 setTimeout(typeTextFunc, 500); // Delay typing next text
//             } else {
//                 type.textContent = type.textContent.slice(0, -1);
//             }
//         }, 100);
//     }

//     // typeTextFunc();
// }

//
if (jQuery(".top-header-bar .animatedText").text() !== "") {
    //var text = jQuery(".top-header-bar,#animated").text();
    var text = jQuery("#animated").text();
    var sp = text.split(",");
    var values = [];
    jQuery.each(sp, function (index, value) {
        values.push(value.replace(/\n/g, " "));
    });
    var trimmedArray = jQuery.map(values, function (value) {
        return jQuery.trim(value);
    });

    const type = document.querySelector(".top-header-bar .animatedText");
    let listTexts = trimmedArray;
    // console.log(listTexts);
      // The typewriter element
      
    var typeWriterElement = document.getElementById('typewriter');

    // The TextArray: 
    var textArray = listTexts;
    // console.log(textArray);
    // You can also do this by transfering it through a data-attribute
    // var textArray = typeWriterElement.getAttribute('data-array');


    // function to generate the backspace effect 
    function delWriter(text, i, cb) {
        if (i >= 0 ) {
            typeWriterElement.innerHTML = text.substring(0, i--);
            // generate a random Number to emulate backspace hitting.
            var rndBack = 10 + Math.random() * 100;
            setTimeout(function() {
                delWriter(text, i, cb);
            },rndBack); 
        } else if (typeof cb == 'function') {
            setTimeout(cb,1000);
        }
    };

    // function to generate the keyhitting effect
    function typeWriter(text, i, cb) {
        if ( i < text.length+1 ) {
            typeWriterElement.innerHTML = text.substring(0, i++);
            // generate a random Number to emulate Typing on the Keyboard.
            var rndTyping = 250 - Math.random() * 100;
            setTimeout( function () { 
                typeWriter(text, i++, cb)
            },rndTyping);
        } else if (i === text.length+1) {
            setTimeout( function () {
                delWriter(text, i, cb)
            },1000);
        }
    };

    // the main writer function
    function StartWriter(i) {
        if (typeof textArray[i] == "undefined") {
            setTimeout( function () {
                StartWriter(0)
            },1000);
        } else if(i < textArray[i].length+1) {
            typeWriter(textArray[i], 0, function () {
                StartWriter(i+1);
            });
        }  
    };
    // wait one second then start the typewriter
    setTimeout( function () {
        StartWriter(0);
    },1000);


}
jQuery(document).ajaxComplete(function (event, request, settings) {
    if (
        settings.extraData &&
        settings.extraData.view_base_path == "blog" &&
        settings.extraData.view_display_id == "page_1"
    ) {
        if (
            jQuery(
                "#views-exposed-form-blog-page-1 input[type='radio']:checked"
            ).val() == "All"
        ) {
            jQuery(".all-items").attr("class", "all-items");
        } else {
            jQuery(".all-items").removeAttr("class");
        }
    }
});

Drupal.behaviors.myBehavior = {
    attach: function (context, settings) {
        jQuery("#edit-created").daterangepicker({
            singleDatePicker: true,
            locale: {
                format: "YYYY-MM-DD ",
            },
        });

        //    jQuery("#edit-date-range").daterangepicker();
        jQuery("#edit-date-range").daterangepicker({
            minDate: moment(), // Set the minimum date to today
        });
        jQuery("#edit-other-possible-dates").daterangepicker({
            minDate: moment(), // Set the minimum date to today
        });
        jQuery("#edit-created--2").daterangepicker({
            singleDatePicker: true,
            locale: {
                format: "YYYY-MM-DD ",
            },
        });
        jQuery("#edit-desired-exact-date").daterangepicker({
            singleDatePicker: true,
            minDate: moment(),
        });

        // catergorization slider
        jQuery(".carouselTicker").carouselTicker();

        jQuery(".carouselTicker3").carouselTicker({});
        jQuery(".carouselTicker2").carouselTicker({
            direction: "next",
        });
        //testimonial

        jQuery(".testimonial-card-slider").slick({
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            dots: false,
            infinite: true,
            initialSlide: 1,
            slidesToScroll: 1,
            slidesToShow: 3.5,
            prevArrow:
                '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
            nextArrow:
                '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
            responsive: [
                {
                    breakpoint: 1680,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: false,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: false,
                    },
                },
            ],
        });

        // category product sliders
        jQuery(".detailed-cards-slider").slick({
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            dots: false,
            // infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow:
                '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
            nextArrow:
                '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                        dots: false,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                        dots: false,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                        dots: false,
                    },
                },
            ],
        });

        jQuery(".catergory-slider").slick({
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            dots: false,
            infinite: true,
            margin: 24,
            slidesToShow: 4.5,
            initialSlide: 0.5,
            slidesToScroll: 1,
            prevArrow:
                '<button class="primary-slider-btn slide-arrow prev-arrow"></button>',
            nextArrow:
                '<button class="primary-slider-btn slide-arrow next-arrow"></button>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        initialSlide: 0.5,
                        arrows: true,
                        dots: false,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        initialSlide: 0.5,
                        arrows: false,
                        dots: false,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        initialSlide: 0.5,
                        arrows: false,
                        dots: false,
                    },
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        initialSlide: 0.5,
                        arrows: false,
                        dots: false,
                    },
                },
            ],
        });
        jQuery('.blog-post .ui-group .filters .form-radios').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<div class="slide-arrow prev-arrow"></div>',
            nextArrow: '<div class="slide-arrow next-arrow"></div>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
            }); 
            jQuery('.ui-group .filters .form-radios').slick({
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 1,
                prevArrow: '<div class="slide-arrow prev-arrow"></div>',
                nextArrow: '<div class="slide-arrow next-arrow"></div>',
                responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 2
                    }
                }
                ]
                });
        //commerce product pages
        // var highestBox = 0;
        // jQuery(".product-overview-wrapper .best-seller-booking-card").each(
        //     function () {
        //         if (jQuery(this).height() > highestBox) {
        //             highestBox = jQuery(this).height();
        //         }
        //     }
        // );
        // jQuery(".overview-detail-wrapper").height(highestBox);

        // jQuery(".show-more-btn").on("click", function (event) {
        //     event.preventDefault(); // Prevent the default behavior of the anchor element
        //     jQuery(".overview-detail-wrapper").addClass("active");

        // });

        // jQuery(".show-more-btn.rental").on("click", function (event) {
        //     event.preventDefault(); // Prevent the default behavior of the anchor element
        //     jQuery(".overview-detail-wrapper").toggleClass("active");
        //     var buttonText = jQuery(".overview-detail-wrapper").hasClass(
        //         "active"
        //     )
        //         ? "Show Less"
        //         : "Show More";
        //     jQuery(".show-more-btn.rental").text(buttonText);
        // });
        //commerce product pages
    },
};

(function ($, Drupal, drupalSettings) {
    // jQuery(".show-more-btn.rental").on("click", function (event) {
    //     event.preventDefault(); // Prevent the default behavior of the anchor element
    //     jQuery(".overview-detail-wrapper").toggleClass("active");
    //     var buttonText = jQuery(".overview-detail-wrapper").hasClass("active")
    //         ? "Show Less"
    //         : "Show More";
    //     jQuery(".show-more-btn.rental").text(buttonText);
    // });

    jQuery(".show-more-btn.overviewtext").on("click", function (event) {
        event.preventDefault();
    
        var overviewDetail = jQuery(this).closest(".overview-detail");
        overviewDetail.toggleClass("active");
    
        var buttonText = overviewDetail.hasClass("active") ? "Show Less" : "Show More";
        jQuery(this).text(buttonText);
    });

    

    jQuery(".left-block-links li a").hover(
        function () {
            jQuery(this).addClass("active");
        },
        function () {
            jQuery(this).removeClass("active");
        }
    );
})(jQuery, Drupal, drupalSettings);

jQuery(document).ready(function () {

    // 17-01-24
    jQuery(".show-more-btn.vesseltext").on("click", function (event) {
        event.preventDefault();
    
        var overviewDetail = jQuery(this).closest(".overview-detail");
        overviewDetail.toggleClass("vessel-price");
    
        var buttonText = overviewDetail.hasClass("vessel-price") ? "Show Less" : "Show Price";
        jQuery(this).text(buttonText);
    });
    //17-01-24

    jQuery(".dropdown").click(function () {
        jQuery(this).toggleClass("active");
        jQuery(".dropdown").not(this).removeClass("active");
    });
});

//blogpost slider end

//jquery for registration form
jQuery(document).ready(function () {
    // Select the input fields.
    var $emailInput = jQuery("#edit-email");
    var $nameInput = jQuery("#edit-name");

    function handleInputClass($input) {
        if ($input.length) {
            if ($input.val().trim() !== "") {
                $input.addClass("check-active");
            } else {
                $input.removeClass("check-active");
            }
        }
    }

    // Add input event listeners to all input fields.
    $emailInput.add($nameInput).on("input", function () {
        handleInputClass(jQuery(this));
    });

    // Initial check for pre-filled data.
    handleInputClass($emailInput);
    handleInputClass($nameInput);
    // handleInputClass($retypePasswordInput);
});

//jquery for show more and show less

var originalLength = 0; // Original length = 4
//jQuery('.table-blocks tr.hidden:gt(' + (rowsToShow - 1) + ')').hide();
jQuery(".table-blocks tr").addClass("hidden");
jQuery(".table-blocks tr:lt(" + originalLength + ")").addClass("active");
var rowCount = jQuery(".table-blocks tr").length;

var hidden = true;
var $table = jQuery("table").find("tbody");
jQuery("a.load_more").on("click", function (e) {
    e.preventDefault();
    if (hidden) {
        // First click, it is hidden, so expand
        $table.find("tr.hidden").hide();
        $table.find("tr.hidden").show();
        jQuery(this).html("Show Less"); // Change HTML
    } else {
        $table.find("tr.hidden").hide();
        $table.find("tr:lt(" + originalLength + ")").show();
        jQuery(this).html("Show More"); // Change HTML
    }
    hidden = !hidden;
});
// Get references to the select element and the divs to show/hide
const selectBox = document.getElementById("edit-desired-time-frame-");
const divOption1 = document.getElementById("divOption1");
const divOption2 = document.getElementById("divOption2");
const divOption3 = document.getElementById("divOption3");
if (selectBox) {
    // Add an event listener to the select element
    selectBox.addEventListener("change", function () {
        // Hide all divs

        divOption1.classList.add("hidden");
        divOption2.classList.add("hidden");
        divOption3.classList.add("hidden");

        // Check the selected option's value and show the corresponding div
        const selectedOption = selectBox.value;
        if (selectedOption === "4") {
            divOption1.classList.remove("hidden");
        } else if (selectedOption === "6") {
            divOption2.classList.remove("hidden");
        } else if (selectedOption === "8") {
            divOption3.classList.remove("hidden");
        } else {
            divOption3.classList.remove("hidden");
        }
    });
    divOption1.classList.remove("hidden");
}

function calculateCombinedHours() {
    var selectedValue1 =
        parseInt(jQuery("#edit-desired-time-frame-").val()) || 0;
    var selectedValue2 =
        parseInt(jQuery("#edit-extra-hour-optional-").val()) || 0;

    var product_id = jQuery("#product_id").text(); // You can set your dynamic product_id here.

    if (selectedValue1 == "4") {
        var price = jQuery(
            ".product--variation-field--variation_field_4hrs_rental__" +
                product_id
        ).text();
    } else if (selectedValue1 == "6") {
        var price = jQuery(
            ".product--variation-field--variation_field_6hrs_rental__" +
                product_id
        ).text();
    } else if (selectedValue1 == "8") {
        var price = jQuery(
            ".product--variation-field--variation_field_8hrs_rental__" +
                product_id
        ).text();
    } else {
        // Handle the case where selectedValue1 doesn't match any of the expected values.
    }

    var priceText = jQuery(
        ".product--variation-field--variation_field_extra_hour__" + product_id
    ).text();
    if (priceText) {
        var match = priceText.match(/\d+/);

        var matchsecond = price.match(/\d+/);

        var numbers = parseInt(matchsecond["input"].replace(/\$|,|\..*$/g, ""));

        if (match) {
            var number = parseFloat(match[0]);

            if (!isNaN(number)) {
                var total = selectedValue2 * number;
                jQuery("#extar_hour").text(
                    "$" + total.toFixed(2) + "/" + selectedValue2 + "hrs"
                );
            }
        }

        var numberSecond = parseFloat(matchsecond["input"]);
    }
    var combinedHours = selectedValue1 + selectedValue2;
    var priceCombined = numbers + total;

    jQuery("#result").text(combinedHours + " hours");
    jQuery("#total_hour").text(
        "$" + priceCombined.toFixed(2) + "/" + combinedHours + "hrs"
    );
}

jQuery("#edit-desired-time-frame-, #edit-extra-hour-optional-").on(
    "input",
    calculateCombinedHours
);
calculateCombinedHours();
//
jQuery(document).ready(function () {
    // Function to reposition menu
    function repositionMenu() {
        var menu = jQuery("header .header-nav .primary-nav");
        if (window.matchMedia("(max-width: 767px)").matches) {
            menu.appendTo(".fullscreen.active ul li #block-toggle-menu");
        } else {
            menu.appendTo("header .header-nav .primary-nav");
        }
    }

    repositionMenu();

    jQuery(window).resize(function () {
        repositionMenu();
    });
});

jQuery(document).ready(function () {
    jQuery(".table-fixed tbody th.vertical-header").each(function () {
        var firstHeader = jQuery(this);
        jQuery(this)
            .closest("tr")
            .prepend(firstHeader.clone().addClass("fixed-header"));
    });

    // Set the width of the fixed header to match the original header
    var originalWidth = jQuery(
        ".table-fixed thead th.vertical-header"
    ).outerWidth();
    jQuery(".fixed-header").width(originalWidth);
});

/*gallery 1dec*/

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides.length > 0 && dots.length > 0) {
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        captionText.innerHTML = dots[slideIndex - 1].alt;
    }
}

/*gallery 1dec*/

/*listing page dollar sign */
jQuery(document).ready(function() {
    // Add a dollar sign to the edit-price-number-min input
    // jQuery('#edit-price-number-min').val('$' + jQuery('#edit-price-number-min').val());
    // jQuery('#edit-price-number-max').val('$' + jQuery('#edit-price-number-max').val());

    function updateAverage() {
    // Calculate the average of both inputs and update the average-range paragraph
    var minValue = parseFloat((jQuery('#edit-price-number-min').val() || '').replace('$', '')) || 0;
    var maxValue = parseFloat((jQuery('#edit-price-number-max').val() || '').replace('$', '')) || 0; 

    var averageValue = (minValue + maxValue) / 2;
   
   if (  jQuery('.average-range').length === 0) {
    var htmlContent = '<p class="average-range">Average price: $<span class="average-value">' + averageValue.toFixed(2) + '</span></p>';

    jQuery('#edit-price-number-wrapper--2').append(htmlContent);

    // jQuery('#edit-price-number-wrapper').append('<p class="average-range">Average price: $<span class="average-value">' + averageValue.toFixed(2) + '</span></p>');
  } else {
    // Update the existing average display element
    jQuery('.average-value').text(averageValue.toFixed(2));
  }
}

// Initial update
updateAverage();

// Event handler for input changes
jQuery('#price-range-form input').on('input', function() {
  updateAverage();
});
  });

    // Drupal.behaviors.myBehavior = {
    //     attach: function (context, settings) {
        jQuery('.blog-post .ui-group .filters .form-radios').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<div class="slide-arrow prev-arrow"></div>',
            nextArrow: '<div class="slide-arrow next-arrow"></div>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
            }); 

        jQuery('.ui-group .filters .form-radios').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        prevArrow: '<div class="slide-arrow prev-arrow"></div>',
        nextArrow: '<div class="slide-arrow next-arrow"></div>',
        responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 450,
            settings: {
                slidesToShow: 1
            }
        }
        ]
        });

        var urlParams = new URLSearchParams(window.location.search);
            var type = urlParams.get('type');
        
            // Add 'btn-active' class based on the 'type' parameter
            if (type === 'shared') {
            jQuery('a[href="?type=shared"]').addClass('btn-active');
            } else if (type === 'private') {
            jQuery('a[href="?type=private"]').addClass('btn-active');
            }
//     },
// };

       
