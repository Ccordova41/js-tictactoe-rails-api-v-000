// Code your JavaScript / jQuery solution here

const WINNING_COMBOS = [[0,1,2], [3,4,5], [6,7,8], [0,3,6],
                        [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
var turn = 0;
var currentGame = 0;

$(document).ready(function() {
  attachListeners();
});

// turn is already 0, so it's an odd number.
//'X' when the turn variable is even and 'O' when it is odd.
var player = () => turn % 2 ? 'O' : 'X';

//Invokes player() and adds the returned string ('X' or 'O') to the
//clicked square on the game board.
function updateState(square) {
  var token = player();
  $(square).text(token);
}

//Accepts a string and adds it to the div#message element in the DOM.
function setMessage(string) {
  $('#message').text(string);
}

// Returns true if the current board contains any winning combinations
// (three X or O tokens in a row, vertically, horizontally, or diagonally).
// Otherwise, returns false.
// If there is a winning combination on the board, checkWinner() should invoke
// setMessage(), passing in the appropriate string based on who won: 'Player X Won!'
//  or 'Player O Won!'

function checkWinner() {
  var board = {};
  var winner = false;

  $('td').text((index, square) => board[index] = square);

  WINNING_COMBOS.some(function(combo) {
    if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
      setMessage(`Player ${board[combo[0]]} Won!`);
      return winner = true;
    }
  });

  return winner;
}

// Increments the turn variable by 1.
// Invokes the updateState() function, passing it the element that was clicked.
// Invokes checkWinner() to determine whether the move results in a winning play.

function doTurn(square) {
  updateState(square);
  turn++;
  if (checkWinner()) {
    saveGame();
    resetBoard();
  } else if (turn === 9) {
    setMessage("Tie game.");
    saveGame();
    resetBoard();
  }
}
function attachListeners() {
  $('td').on('click', function() {
    if (!$.text(this) && !checkWinner()) {
      doTurn(this);
    }
  });

  $('#save').on('click', () => saveGame());
  $('#previous').on('click', () => showPreviousGames());
  $('#clear').on('click', () => resetBoard());
}