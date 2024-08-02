const prompt = require('prompt-sync')();

let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = '🐐';
let active = true;

function printBoard() {
  console.log(`
    ${board[0]} | ${board[1]} | ${board[2]}
    ---------
    ${board[3]} | ${board[4]} | ${board[5]}
    ---------
    ${board[6]} | ${board[7]} | ${board[8]}
  `);
}

function handleMove(position) {
  if (board[position] === ' ') {
    board[position] = currentPlayer;
  } else {
    console.log('Cell already taken, choose another one.');
    return false;
  }

  if (checkWin()) {
    printBoard();
    console.log(`Player ${currentPlayer} wins!`);
    active = false;
    return true;
  }

  if (board.every(cell => cell !== ' ')) {
    printBoard();
    console.log('It\'s a draw!');
    active = false;
    return true;
  }

  currentPlayer = currentPlayer === '🐐' ? '🍇' : '🐐';
  return true;
}

function checkWin() {
  const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return conditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
  });
}

while (active) {
  printBoard();
  const position = prompt(`Player ${currentPlayer}, enter your move (0-8): `);

  if (position >= 0 && position <= 8) {
    handleMove(parseInt(position));
  } else {
    console.log('Invalid position, enter a number between 0 and 8.');
  }
}