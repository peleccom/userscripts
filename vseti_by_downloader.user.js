// ==UserScript==
// @name       Vseti.by downloader
// @namespace  http://peleccom.appspot.com/vseti
// @version    0.1.1
// @description  This script help to download video from vseti.by
// @updateURL https://raw.githubusercontent.com/peleccom/userscripts/master/vseti_by_downloader.user.js
// @match      http://vseti.by/*
// @copyright  2012+, Peleccom
// ==/UserScript==

(function (window, undefined) {
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }
    var $ = w.$;
    var TIMEOUT = 5000;
    var marker_class = "direct_link_extracted";
    var divider_el = $('<span class="divider">|</span>');
    var download_el = $('<a class="mv_hide_info" style="color: rgb(255, 255, 255);">Скачать</a>');
    
    var img = '<div style="background-color: black;color:white; width: 22px; height: 22px;"></div>';

    function run() {
        window.setInterval(video_search, TIMEOUT);
    }

    function video_search() {
        var video = $('.video_box').not('.'+marker_class);
        video.each(
            function (){
                $(this).addClass(marker_class);
                var config = $("param[name='flashvars']", this).val();
                var json = config.substr(7);
                var obj = JSON.parse(json);
                var url = obj.clip.url;
                url = unescape(url);
                var controls_line = $("#mv_controls_line");
                add_download_button(controls_line, url);
            }
            );
    }
    
    
    function add_download_button(element, url){
        var local_download_el = download_el.clone();
        local_download_el.attr("href", url);
        element.append(divider_el.clone());
        element.append(local_download_el);
    }

run();
})(window);
