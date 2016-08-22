/**
 * Created by RUPINDERJEET on 8/20/2016.
 */




$(document).ready(function(){

    $(window).bind('scroll', function() {
        var navHeight = $("#menu_header").innerHeight();

        if ($(window).scrollTop() > navHeight) {
            $('nav').addClass('fix-it');
        } else {
            $('nav').removeClass('fix-it');
        }
    });

});