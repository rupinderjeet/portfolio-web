/**
 * Created by RUPINDERJEET on 8/20/2016.
 */




$(document).ready(function(){

    $(window).bind('scroll', function() {
        var nav = $('#menu');
        var navHeader = $("#top");

        console.log($(window).scrollTop() + " - " + navHeader.innerHeight());

        if ($(window).scrollTop() > navHeader.innerHeight()) {
            nav.addClass('fix-it');
            navHeader.css("margin-bottom", "5%");
        } else {
            nav.removeClass('fix-it');
            navHeader.css("margin-bottom", "0");
        }
    });

    $('.carousel').carousel();

});