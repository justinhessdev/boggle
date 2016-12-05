// array that contains references to each player's board
var $playerBoardArray=[$('#playerOneBoard'), $('#playerTwoBoard')];

// array that contains references to each player's score 
var $playerScoreArray=[$('#playerOneScoreBoard'), $('#playerTwoScoreBoard')];

var playerScoreTracker = [{player: "Player 1", score: "0"}, {player: "Player 2", score: "0"}];

// represents which player has turn
var currentPlayerIndex = 0;

// represents our 9 tiles
var $tiles = $('.tiles');

// array containing each letter of alphabet
var letterArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// represents the area where clicked letters appear on board
var $clickedWord = $('#clickedWord');

// represents the 9 tiles on the board
var $tiles = $('.tile');

// global variable to keep track of interval and stop timer at 0
var $myInterval;

// keeps track of red tiles and stops interval when complete
var $redInterval;

// keeps track of green tiles and stops interval when complete
var $greenInterval;

// keerps track of interval for size of tiles
var $textSizeInterval;

// represents the countdown timer
var $countdownTimer = $('#countdownTimer');

// represents the lock image for hiding the word list
var $hiddenImageArr = [$('#hiddenImageOne'), $('#hiddenImageTwo')];

var $newGame = $('#newGameButton');

var $startGame = $('#startButton');

// fill each tile a random letter from the alphabet
function fillTileWithRandomLetter() {
  if (currentPlayerIndex == 0) {
    for(var i=0; i<$tiles.length; i++){
      $tiles[i].innerHTML = letterArr[Math.floor(Math.random()*letterArr.length)];
    }
  }
  $textSizeInterval = setInterval(tileEffect, 10);
}

// on click add letter to word div
// make tile change color to symbolize clicked
function tileLogic() {
  if($(this).hasClass('selectedTile')){
    var currentWord = $clickedWord.text();
    var newWord = currentWord.replace($(this).text(), '');
    $clickedWord.text(newWord);
  } else {
    $clickedWord.text($clickedWord.text() + $(this).text());
  }

  $(this).toggleClass('selectedTile');
}

function wordLogic() {

  if ($countdownTimer.text() === "0"){
    console.log("Time is uppp");
    return;
  }

  var $selectedTiles = $('.selectedTile');
  if (words.indexOf($clickedWord.text()) >= 0){
    playerScoreTracker[currentPlayerIndex].score = parseInt(playerScoreTracker[currentPlayerIndex].score) + $clickedWord.text().length;
    $playerScoreArray[currentPlayerIndex].text("Score: " + parseInt(playerScoreTracker[currentPlayerIndex].score));
    // represents clicked tiles
    $playerBoardArray[currentPlayerIndex].append('<div class="addedWordClass"><p class="addedWordP">' + $clickedWord.text() + '</p></div>');
    $clickedWord.text("");
    $selectedTiles.addClass("greenTile");
    $greenInterval = setInterval(removeGreen, 100);
  } else {
    $clickedWord.text("");
    $selectedTiles.addClass("redTile");
    $redInterval = setInterval(removeRed, 100);
  }
}

function removeRed() {
  var $selectedTiles = $('.selectedTile');
  $selectedTiles.removeClass("redTile");
  $selectedTiles.removeClass("selectedTile");
  clearInterval($redInterval);
}

function removeGreen() {
  var $selectedTiles = $('.selectedTile');
  $selectedTiles.removeClass("greenTile");
  $selectedTiles.removeClass("selectedTile");
  clearInterval($greenInterval);
}

function startLogic() {
  $tiles.on('click', tileLogic);
  $('#navBar').slideUp("fast", showTimer);
  $('#gameContainer').show(200, fillTileWithRandomLetter);
  $hiddenImageArr[currentPlayerIndex].hide();
}

function showTimer() {
  $countdownTimer.slideDown("fast", startInterval);
}

function startInterval() {
  $myInterval = setInterval(startTimer, 1000);
}

function startTimer() {
  $countdownTimer.text($countdownTimer.text()-1);
  if($countdownTimer.text() === "0"){
    clearInterval($myInterval);
    currentPlayerIndex++;
    if(currentPlayerIndex>1){
      $('#navBar').slideDown("fast", gameOverLogic);
    } else {
      $('#navBar').slideDown("fast", reset);
    }
  }
}

function reset() {
  var currentPlayer = $('#currentPlayer');
  currentPlayer.text("Player " + (currentPlayerIndex+1));
  $countdownTimer.hide();
  $tiles.css("fontSize", 0);
  $('#gameContainer').hide();
  $countdownTimer.text("10");
  $('.addedWordClass').hide();
  $hiddenImageArr[0].show();
  $tiles.off();
  $tiles.removeClass("selectedTile");
  $tiles.removeClass("redTile");
  $tiles.removeClass("greenTile");
  $clickedWord.text("");
  // $textSizeInterval = setInterval(tileEffect, 20);
}

/*
  NEEDS TO BE IMPLEMENTED
*/
function gameOverLogic() {
  var currentPlayer = $('#currentPlayer');
  currentPlayer.text("Game Over");
  var gameIndex = indexOfMaxTwoPlayers(playerScoreTracker);
  if (gameIndex === -1){
    $('#gameRules').text(playerScoreTracker[0].player + " and " + playerScoreTracker[1].player + " tied");
    $('#funnyMessage').text("You are both stupid");
  } else {
      $('#gameRules').text(playerScoreTracker[gameIndex[0]].player + " wins the game");
      $('#funnyMessage').text(playerScoreTracker[gameIndex[1]].player + " was stupid");
  }
  $countdownTimer.hide();
  $('.addedWordClass').show();
  $hiddenImageArr[0].hide();
  $tiles.off();
  $tiles.removeClass("selectedTile");
  $tiles.removeClass("redTile");
  $tiles.removeClass("greenTile");
  $clickedWord.text("");
  $startGame.hide();
  $newGame.show();
}

function newGameLogic() {
  playerScoreTracker[0].score = "0";
  playerScoreTracker[1].score = "0";
  $countdownTimer.text("10");
  currentPlayerIndex=0;
  $newGame.hide();
  $startGame.show();
  $('#gameRules').text("You have 30 seconds to make as many words as you can");
  $('#funnyMessage').text("Don't be stupid");
  $('#playerOneScoreBoard').text("Score: 0");
  $('#playerTwoScoreBoard').text("Score: 0");
  $('.addedWordClass').remove();
  $hiddenImageArr[1].show();
  startLogic();
}
// returns index of largest number -- in our case the index of the player with the highest score
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0].score;
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i].score > max) {
            maxIndex = i;
            max = arr[i].score;
        }
    }

    return maxIndex;
}

function indexOfMaxTwoPlayers(arr) {
    if (arr[0].score === arr[1].score) {
        return -1;
    }

    var max = arr[0].score;
    var maxIndex = 0;
    var lowIndex = 1;

    if (arr[1].score > max) {
        maxIndex = 1;
        lowIndex = 0;
    }

    return [maxIndex, lowIndex];
}

var sizeCounter = 1;
function tileEffect() {
  $tiles.css("fontSize", sizeCounter);
  
  if(sizeCounter == 20){
    clearInterval($textSizeInterval);
    sizeCounter = 0;
  }

    sizeCounter++;
}

/*
 * IMPLEMENTING FUNCTIONS
 */

$newGame.hide();
$countdownTimer.hide();
$('#gameContainer').hide();
$('#enterButton').on('click', wordLogic);
$newGame.on('click', newGameLogic);
$startGame.on('click', startLogic);