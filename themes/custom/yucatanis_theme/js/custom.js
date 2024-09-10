var elementId = jQuery("#typewriter1").attr("id");
if (elementId === "typewriter1") {
  var text = jQuery("#bannertext").text();
  var sp = text.split(",");
  var values = [];
  jQuery.each(sp, function(index, value) {
    values.push(value.replace(/\n/g, " "));
  });

  var trimmedArray = jQuery.map(values, function(value) {
    return jQuery.trim(value);
  });

  let listText = trimmedArray;

  const type = document.querySelector("#typewriter1");

  // Function to create typing effect
  function typeWriter(textArray, index) {
    const type = document.querySelector("#typewriter1");
    if (index < textArray.length) {
      let currentText = textArray[index];
      let typingIndex = 0;
      let interval = setInterval(function() {
        type.innerHTML += currentText.charAt(typingIndex);
        typingIndex++;
        if (typingIndex === currentText.length) {
          clearInterval(interval);
          setTimeout(function() {
            type.innerHTML = ""; // Clear the current text after delay
            if (index == textArray.length - 2) {
              typeWriter(textArray, 0);
            } else {
              // Move to next item in array
              typeWriter(textArray, index + 1);
            }
          }, 1000); // Adjust delay between texts (in milliseconds)
        }
      }, 150); // Adjust typing speed here (in milliseconds)
    }
  }

  // Start typing effect
  typeWriter(listText, 0);
}
//header js
if (jQuery(".top-header-bar .animatedText").text() !== "") {
    var text = jQuery("#animated").text();
    var sp = text.split(",");
    var values = [];
    jQuery.each(sp, function (index, value) {
        values.push(value.replace(/\n/g, " "));
    });
    var trimmedArray = jQuery.map(values, function (value) {
        return jQuery.trim(value);
    });


    let listTexts = trimmedArray;
    const type = document.querySelector(".top-header-bar .animatedText");
  // Function to create typing effect
  function typeWriter(textArray, index) {
    const type = document.querySelector(".top-header-bar .animatedText");
    if (index < textArray.length) {
      let currentText = textArray[index];
      let typingIndex = 0;
      let interval = setInterval(function() {
        type.innerHTML += currentText.charAt(typingIndex);
        typingIndex++;
        if (typingIndex === currentText.length) {
          clearInterval(interval);
          setTimeout(function() {
            type.innerHTML = ""; // Clear the current text after delay
            // console.log(index);
            if (index == textArray.length - 2) {
              // If it's the last item, start over from the beginning
            //   console.log(textArray);
              typeWriter(textArray, 0);
            } else {
              // Move to next item in array
              typeWriter(textArray, index + 1);
            }
          }, 1000); // Adjust delay between texts (in milliseconds)
        }
      }, 150); // Adjust typing speed here (in milliseconds)
    }
  }

  // Start typing effect
  typeWriter(listTexts, 0);
}

jQuery(".marquee_text").marquee({
    direction: "left",
    duration: 90000,
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
    jQuery('#copy-number').click(function () {
        // Get the text within the <a> tag
        var linkText = jQuery(this).text().trim();

        // Extract the number part (assuming the number follows the "COPY " text)
        var number = linkText.replace('COPY ', '').trim();

        // Create a temporary input element
        var tempInput = jQuery('<input>');
        jQuery('body').append(tempInput);

        // Set the value of the temporary input to the extracted number
        tempInput.val(number).select();

        // Copy the text to the clipboard
        document.execCommand('copy');

        // Remove the temporary input
        tempInput.remove();

        // Optionally, provide some visual feedback to the user
        alert('Number copied: ' + number);
      });
      jQuery('#copy-nextnumber').click(function () {
        // Get the text within the <a> tag
        var linkText = jQuery(this).text().trim();

        // Extract the number part (assuming the number follows the "COPY " text)
        var number = linkText.replace('COPY ', '').trim();

        // Create a temporary input element
        var tempInput = jQuery('<input>');
        jQuery('body').append(tempInput);

        // Set the value of the temporary input to the extracted number
        tempInput.val(number).select();

        // Copy the text to the clipboard
        document.execCommand('copy');

        // Remove the temporary input
        tempInput.remove();

        // Optionally, provide some visual feedback to the user
        alert('Number copied: ' + number);
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

    var slidesCount = jQuery(".mySlides").length;
    for (var z = 0; z < slidesCount; z++) {
    console.log(slidesCount);
    jQuery("#slidecount-"+ z ).append(slidesCount);
    var slidesCount = jQuery(".mySlides").length;
    jQuery("#slidecount-"+ z ).empty();

     // Append the slidesCount to .numbertext.
    jQuery("#slidecount-" + z ).append(slidesCount);
    }

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

            // private modal popup
            jQuery(document).ready(function () {
                // Trigger modal popup when Private Booking button is clicked
                jQuery('#private-booking').click(function (e) {
                  e.preventDefault();
                  // Show modal popup
                  jQuery('#myModalproduct').modal('show');
                });

                //success page popup
                jQuery('#mybookingpopup').modal('show');
              });
             // private modal popup end

//     },
// };

jQuery(document).ready(function() {
  let currentUrl = window.location.href;

  // Check if the URL contains 'checkout/' or 'form/personal-details'
  if (currentUrl.indexOf('checkout/') !== -1 || currentUrl.indexOf('form/personal-details') !== -1) {
    // Hide the .top-header-bar element
    jQuery('.top-header-bar').css('display', 'none');
  }
});



