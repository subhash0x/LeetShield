$(document).ready(function() {
    "use strict";
    $(".screen-height").css({
        'height': window.innerHeight
    });
    $(window).load(function() {
        $("#preloader,#loader").fadeOut(2000);
        animate_elems()
    });
    $('.toBottom').bind("click", function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        return !1
    });
    jQuery('.skill').each(function() {
        jQuery(this).appear(function() {
            jQuery(this).find('.skill-box').animate({
                width: jQuery(this).attr('data-percent')
            }, 1000)
        })
    });
    $('.grid').isotope({
        itemSelector: '.portfolio-block',
        percentPosition: !0,
        masonry: {
            columnWidth: '.grid-sizer',
            gutter: 30
        }
    });
    
    $(".header-4 .menu-buttons a").on('click', function() {
        $(".header-4").toggleClass("open")
    });
    $(window).stellar({
        responsive: !0,
        horizontalScrolling: !1,
        hideDistantElements: !1,
        horizontalOffset: 0,
        verticalOffset: 0
    });
    $('.count').each(function() {
        jQuery(this).appear(function() {
            var $this = $(this);
            jQuery({
                Counter: 0
            }).animate({
                Counter: $this.text()
            }, {
                duration: 1000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.ceil(this.Counter))
                }
            })
        })
    });
    $("#banner-slider").owlCarousel({
        navigation: !0,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: !0,
        navigationText: ['<i class="icofont icofont-thin-left"></i>', '<i class="icofont icofont-thin-right"></i>'],
        pagination: !1,
        transitionStyle: "backSlide",
        autoPlay: !0,
        responsiveRefreshRate: 200
    });
    $("#testi-slider").owlCarousel({
        navigation: !1,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: !0,
        pagination: !1,
        autoPlay: !0
    });
    $(".action_3-slider").owlCarousel({
        navigation: !0,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: !0,
        pagination: !1,
        autoPlay: !0,
        transitionStyle: "fade",
        addClassActive: !0,
        navigationText: ['<i class="icofont icofont-thin-left"></i>', '<i class="icofont icofont-thin-right"></i>'],
    });
    $("#portfolio-slider").owlCarousel({
        autoPlay: 3000,
        navigation: !1,
        items: 2,
        pagination: !0,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [979, 2]
    });
    var submitContact = $('#submit_contact'),
        message = $('#msg');
    submitContact.on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        $.ajax({
            type: "POST",
            url: 'contact.php',
            dataType: 'json',
            cache: !1,
            data: $('#contact-form').serialize(),
            success: function(data) {
                if (data.info !== 'error') {
                    $this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
                    message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow')
                } else {
                    message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow')
                }
            }
        })
    });
    var selectIds = $('#panel1,#panel2,#panel3');
    selectIds.on('show.bs.collapse hidden.bs.collapse', function() {
        $(this).prev().find('.fa').toggleClass('fa-caret-right fa-caret-down')
    });
    if ($(window).width() <= 767) {
        $("#slide-nav #menu_nav ul > li.dropdown").append('<div class="more"></div>');
        $("#slide-nav #menu_nav").on("click", ".more", function(e) {
            e.stopPropagation();
            $(this).parent().toggleClass("current").children("#slide-nav #menu_nav ul > li.dropdown > ul").toggleClass("open")
        })
    }
    $(window).resize(function() {
        if (window.innerWidth > 767) {
            if ($('#slide-nav #menu_nav ul > li.dropdown .more').length !== 0) {
                $('#slide-nav #menu_nav ul > li.dropdown div').remove('.more')
            }
        } else {
            $("#slide-nav #menu_nav ul > li.dropdown").append('<div class="more"></div>')
        }
        $(".screen-height").css({
            'height': window.innerHeight
        })
    });
    var $body = $('body'),
        $wrapper = $('.body-innerwrapper'),
        $toggler = $(' .navbar-toggle,.header2 #slide-nav .hand-button .button'),
        $close = $('.closs'),
        $offCanvas = $('.navbar-collapse');
    $toggler.on('click', function(event) {
        event.preventDefault();
        stopBubble(event);
        setTimeout(offCanvasShow, 50)
    });
    $close.on('click', function(event) {
        event.preventDefault();
        offCanvasClose()
    });
    var offCanvasShow = function() {
        $body.addClass('offcanvas');
        $wrapper.on('click', offCanvasClose);
        $close.on('click', offCanvasClose);
        $offCanvas.on('click', stopBubble)
    };
    var offCanvasClose = function() {
        $body.removeClass('offcanvas');
        $wrapper.off('click', offCanvasClose);
        $close.off('click', offCanvasClose);
        $offCanvas.off('click', stopBubble)
    };
    var stopBubble = function(e) {
        e.stopPropagation();
        return !0
    };
    var $elems = $('.animate-in');
    var winheight = $(window).height();
    var fullheight = $(document).height();
    $(window).scroll(function() {
        animate_elems()
    });

    function animate_elems() {
        var wintop = $(window).scrollTop();
        $elems.each(function() {
            var $elm = $(this);
            var topcoords = $elm.offset().top;
            if (wintop > (topcoords - (winheight * .99999))) {
                $elm.addClass('animated')
            }
        })
    }
})