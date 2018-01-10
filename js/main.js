$(document).ready(function() {

    //loadPlayer();

    // Page Scroll
    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 60
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // Scroll Spy
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Media filter links
    var toggles = $('.media-div');
    $('.media-filter a').click(function() {
        // Set the active filter option link
        $('.media-filter a').removeClass('active');
        $(this).addClass('active');

        var target = $(this).data('target');
        var toggle = toggles.filter('.' + target);
        if (toggle.is('.hidden')) {
            toggles.not('.hidden').fadeOut(400, function() {
                // Hide media divs
                toggles.addClass('hidden');
                // Show the div for the filter we clicked on
                toggle
                    .css('display', 'none')
                    .removeClass('hidden')
                    .fadeIn(400);
            });

            // Stop music videos when I change filters (video, screenshot) so we don't keep hearing the music
            //if there is an iframe inside maybe embedded multimedia video/audio, we should reload so it stops playing
            /*var iframes = $('.media-music iframe');
            if (iframes != null) {
                for (var i = 0; i < iframes.length; i++) {
                    iframes[i].src = iframes[i].src; //causes a reload so it stops playing, music, video, etc.
                }
            }*/
        }
    });

    // Lightbox
    /*$(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });*/
    $("#lightgallery").lightGallery({
        selector: '.lightlink'
    });

    // Automatic video thumbnails
    $('#lightgallery-video').lightGallery({
        selector: '.lightvideo'//,
        //loadYoutubeThumbnail: true,
        //youtubeThumbSize: 'default'
    });

    $('#lightgallery-music').lightGallery({
        selector: '.lightmusic'
    });

    $("#lightgallery-hero").lightGallery({
    });

    // Slick slider
    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        cssEase: 'linear',
        speed: 500,
        asNavFor: '.slider-nav'
    });

    $('.slider-nav').slick({
        arrows: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerPadding: 0, // Don't show partial slides on the ends
        asNavFor: '.slider',
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Play the video when it is ready
    /*var video = $('video');
    var videoElement = video[0]; // The first video element on the page TODO: probably just give it an id instead
    if (videoElement.readyState >= videoElement.HAVE_FUTURE_DATA) {
        videoElement.play();
    }
    else {
        // Plain javascript
        //videoElement.addEventListener('canplay', function() {
        //    videoElement.play();
        //}, false);

        // JQuery
        video.on('canplay', function() {
            videoElement.play();
        });       
    }*/

    // Preloader
    var preloader = $('.preloader');
    $(window).on('load', function () {
        // Remove the preloader after the page loads
        preloader.remove();
    });
});


/*
// Use the YouTube API to pause other videos when a new one is played (since I can't get a click event for youtube iframes)
// Load the YouTube API asynchronously
//function loadPlayer() { 
 //   if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubePlayerAPIReady = function() {
            onYouTubeIframeAPIReady();
        };
    //}
//}

players = new Array();
function onYouTubeIframeAPIReady() {
    var temp = $(".media-music iframe");
    for (var i = 0; i < temp.length; i++) {
        var t = new YT.Player($(temp[i]).attr('id'), {
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
        players.push(t);
    }
}
//onYouTubeIframeAPIReady();

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        var playURL = event.target.getVideoUrl();
        for (var i = 0; i < players.length; i++) {
            if (players[i].getVideoUrl() != playURL) {
                players[i].stopVideo();
            }
        }
    }
}*/