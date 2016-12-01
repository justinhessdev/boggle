var currentPlayerIndex = 0;
var player=[{symbol: '1', color: 'yellow'},
            {symbol: '2', color: 'tomato'}];

var $tile = $('.tile');
var isGameStarted=false;
var letterArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


$('#newGame').on('click', newGame);
$('#newGame').hide();
var $clickedWord = $('#clickedWord');

newGame();

// returns a random letter in alphabet
function fillTileWithRandomLetter() {
  return letterArr[Math.floor(Math.random()*letterArr.length)];
}

$('.tile').on('click', tileLogic);

// on click add letter to word div
// make tile change color to symbolize clicked
function tileLogic() {
  $(this).toggleClass('selectedTile');
  $clickedWord.text($clickedWord.text() + $(this).text());
}

function newGame() {

    for(var i=0; i<$('.tile').length; i++){
        $('.tile')[i].innerHTML = fillTileWithRandomLetter();
    }

    $('h1').show();
    currentPlayerIndex=0;
}
