/*jslint browser:true */

$(document).ready(function() {
    $(function () {
        $('div.card-content').click(
            function () {
                $(this).parent().find('> .card-image > img.activator').click();
            }
        );
    });
});

// TODO color theme change
function settings(caller, type, fgcolor, bgcolor){
    switch(type){
        case 'theme':
            document.body.style.color = fgcolor;
            document.body.style.backgroundColor = bgcolor;

            $('a').css("color", fgcolor);
            $('.alert-success').css("color", fgcolor);

            $('nav').css("background-color", bgcolor);
            //$('.well').css("background-color", color);
            //$('.div').css("background-color", color);
            //$('.jumbotron').css("background-color", color);
            //$('nav').css("background-color", color);
            //caller.style.backgroundColor = color;
            break;

        default: console.log('bad settings');
    }
}