const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let isGameOver = false;

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function handleClick(e) {
  const cell = e.target;
  if (cell.textContent !== '' || isGameOver) return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    message.textContent = `Player ${currentPlayer} Wins!`;
    isGameOver = true;
  } else if (isDraw()) {
    message.textContent = "It's a Draw!";
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(player) {
  return winningCombos.some(combo => {
    return combo.every(index => cells[index].textContent === player);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
  currentPlayer = 'X';
  isGameOver = false;
  message.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
