// represent a player
var player=[{symbol: '1'},
            {symbol: '2'}];

// represents which player has turn
var currentPlayerIndex = 0;

// represents our 9 tiles
var $tiles = $('.tiles');

// array containing each letter of alphabet
var letterArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

// represents the area where clicked letters appear on board
var $clickedWord = $('#clickedWord');

// represents the countdown timer contained in the word container
var $countdownTimer = $('#countdownTimer');

// fill each tile a random letter from the alphabet
function fillTileWithRandomLetter() {
  for(var i=0; i<$('.tile').length; i++){
      $('.tile')[i].innerHTML = letterArr[Math.floor(Math.random()*letterArr.length)];
  }
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
  if (!($clickedWord.text() === "")){
    $('#playerOneBoard').append('<div class="addedWordClass"><p class="addedWordP">' + $clickedWord.text() + '</p></div>')
  }
  $clickedWord.text("");
  $('.tile').removeClass('selectedTile');
}

function startLogic() {
  $('#navBar').slideUp("fast", showTimer);
}

function showTimer() {
  $('#countdownTimer').slideDown("fast");
}
/*
 * IMPLEMENTING FUNCTIONS
 */

$('#countdownTimer').hide();
$('.tile').on('click', tileLogic);
$('#enterButton').on('click', wordLogic);
$('#startButton').on('click', startLogic);
fillTileWithRandomLetter();
