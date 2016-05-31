/**
 * Created by RUPINDERJEET on 5/15/2016.
 */

var canvas = document.getElementById('drawing-board');
var context = canvas.getContext('2d');
var i = 0;

function func(){
    //context.save();

    //context.globalAlpha = 0.5;
    context.fillStyle = '#6699ff';
    context.strokeStyle = 'red';
    //context.fillText('CAVARA', 100, 100);
    //context.strokeText('CAVARA', 100, 100);

    var sec = new Date().getSeconds();
    console.log(sec);

    if(sec === 0){
        context.clearRect(200, 200, 59, 50);
    }

    context.fillRect(200, 200, sec, 50);
    context.strokeRect(200, 200, sec, 50);

    //context.restore();
}

window.onload = function () {

    context.font = "30pt Calibri";
    context.fillStyle = "black";
    context.strokeStyle = "white";

    context.fillText('CrossZero Online', 0, 30);
    context.strokeText('CrossZero Online', 0, 30);

    //setInterval(drawClock, 1000);

    //context.fillText('CrossZero Online', 0, 200);
    //context.strokeText('CrossZero Online', 0, 200);

}

