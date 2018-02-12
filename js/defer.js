// https://developers.google.com/youtube/iframe_api_reference
// Use the YouTube API to pause other videos when a new one is played (since I can't get a click event for youtube iframes)
// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('mainPlayer', {
        height: '360', // 640/360 = 1920/1080, same aspect ratio
        width: '640',
        videoId: 'fZvZiYlz5pY',
        playerVars: { 'autoplay': 1, 'controls': 0, 'showinfo': 0, 'rel': 0, 'enablejsapi':1, 'wmode' : 'transparent'},
        events : {
            'onReady' : onPlayerReady,
            'onStateChange' : onPlayerStateChange
        }
    });
}
// The API calls this function when the player's state changes.
function onPlayerStateChange(e) {
    var frm = $(e.target.getIframe());
    if (e.data === YT.PlayerState.ENDED) {
        if ('mainPlayer' === frm.attr('id')) {
            // Loop the splash video when it ends (for a more seamless loop than loop+playlist in url gives)
            player.playVideo();
        }
    }
    if (e.data === YT.PlayerState.BUFFERING) {
        if ('mainPlayer' === frm.attr('id')) {
            setPlaybackQuality('hd1080');
        }
    }
    if (e.data === YT.PlayerState.PLAYING) {
        // Hide the poster image now that the video has finished loading
        $('.video-poster').hide();
    }
}
// The API will call this function when the video player is ready.//
function onPlayerReady(e) {
    e.target.setPlaybackQuality('hd1080');
}