/* wouldn't write comments, its pretty easy to understand */

var playerName1, playerName2;
var playerTag1 = "X", playerTag2 = "O";
var currentPlayer, currentTag;
var turnCount = 0;
var usedPositions = [0];

function setPlayerNames(){
    playerName1 = $('#player-name-1').val().toUpperCase();
    playerName2 = $('#player-name-2').val().toUpperCase();

    var nameError = $('#name-error');
    
    if(playerName1.trim() === "" || playerName1.length < 1){
        nameError.html("Name of first player is too small.");
    } else if(playerName2.trim() === "" || playerName2.length < 1){
        nameError.html("Name of second player is too small.");
    } else if(playerName1 === playerName2){
        nameError.html("Name of both players can't be same.");
    } else {
        $('#versus-label').html(playerName1 + " vs " + playerName2);

        restart();
        showBoard();
        getNextTurn();
    }
}

/* I could have made single method, but that's me. */
function showMenu(){
    $('#menu').removeClass('hide');
    $('#game-board').addClass('hide');
    restart();
}

function showBoard(){
    $('#menu').addClass('hide');
    $('#game-board').removeClass('hide');
}

function restart(){
    turnCount = 0;
    usedPositions = [0];

    for(var i=1; i<=9; i++){

        var btn = $('#xo-' + i);
        var classes = btn.attr('class');

        if(classes.indexOf('teal darken-1') !== (-1)) {
            btn.html("").removeClass('teal darken-1');
        } else {
            btn.html("");
        }
    }

    $('#turn-label').removeClass('white-text');
    getNextTurn();
}

function getNextTurn(){
    if(turnCount < 9){
        if(turnCount % 2 === 0){
            currentPlayer = playerName1;
            currentTag = playerTag1;
        } else {
            currentPlayer = playerName2;
            currentTag = playerTag2;
        }
        
        $('#turn-label').html("Turn: " + currentPlayer + " (" + currentTag + ")");
    } else {
        //winnerDetectionFailed();
    }
}

function playPos(num){
    if( $.inArray(num, usedPositions) === (-1) && num <= 9 ){
        usedPositions.push(num);
        turnCount++;
        $('#xo-' + num).html(currentTag);
        if(!detectWinner()){
            getNextTurn();
        }
    }
}

function detectWinner(){
    var gameWon = false;
    var gameDraw = false;
    var boxValue = [""];

    for(var a=1; a<=9; a++){
        boxValue.push($('#xo-' + a).html());
    }

    if( boxValue[1] === boxValue[5] && boxValue[5] === boxValue[9] && boxValue[5] !== "" ){
        declareWinner(1, 5, 9);
        gameWon = true;

    } else if( boxValue[2] === boxValue[5] && boxValue[5] === boxValue[8] && boxValue[5] !== "" ){
        declareWinner(2, 5, 8);
        gameWon = true;

    } else if( boxValue[3] === boxValue[5] && boxValue[5] === boxValue[7] && boxValue[5] !== "" ){
        declareWinner(3, 5, 7);
        gameWon = true;

    } else if( boxValue[4] === boxValue[5] && boxValue[5] === boxValue[6] && boxValue[5] !== "" ){
        declareWinner(4, 5, 6);
        gameWon = true;

    } else if( boxValue[1] === boxValue[2] && boxValue[2] === boxValue[3] && boxValue[2] !== "" ){
        declareWinner(1, 2, 3);
        gameWon = true;

    } else if( boxValue[3] === boxValue[6] && boxValue[6] === boxValue[9] && boxValue[6] !== "" ){
        declareWinner(3, 6, 9);
        gameWon = true;

    } else if( boxValue[7] === boxValue[8] && boxValue[8] === boxValue[9] && boxValue[8] !== "" ){
        declareWinner(7, 8, 9);
        gameWon = true;

    } else if( boxValue[1] === boxValue[4] && boxValue[4] === boxValue[7] && boxValue[4] !== "" ){
        declareWinner(1, 4, 7);
        gameWon = true;

    } else if( boxValue[1] !== "" && boxValue[2] !== "" && boxValue[3] !== "" && 
               boxValue[4] !== "" && boxValue[5] !== "" && boxValue[6] !== "" && 
               boxValue[7] !== "" && boxValue[8] !== "" && boxValue[9] !== "" ) {

        gameDraw = true;
    }

    if(gameWon){
        for(var i=0; i<=9; i++){
            if($.inArray(i, usedPositions) === (-1) ){
                usedPositions.push(i);
            }
        }

        $('#turn-label')
            .addClass('white-text')
            .html("Game Won by : " + currentPlayer + " {" + currentTag + "}");
    } else if(gameDraw){
        gameWon = gameDraw;
        for(var i=0; i<=9; i++){
            if($.inArray(i, usedPositions) === (-1) ){
                usedPositions.push(i);
            }
        }
        $('#turn-label')
            .addClass('white-text')
            .html("Game Draw :|");
    }

    return gameWon;
}

function declareWinner(a, b, c){
    $('#xo-' + a).addClass("teal darken-1");
    $('#xo-' + b).addClass("teal darken-1");
    $('#xo-' + c).addClass("teal darken-1");
}