const $cells = document.querySelectorAll(".js-cell");
const cellsArray = Array.from($cells);

function getBoardString(gameBoard) {
  let boardString = "";

  for (let i = 0; i < gameBoard.length; i += 1) {
    boardString += `${gameBoard[i] ?? i + 1}`;
    if (i % 3 === 2) {
      boardString += "\n";
    }
  }
  return boardString;
}

function isMoveValid(move, gameBoard) {
  return (
    typeof move === "number" &&
    move >= 0 &&
    move <= 8 &&
    gameBoard[move] === null
  );
}

function makeAMove(gameBoard, nextPlayerSymbol, element) {
  const newGameBoard = [...gameBoard];
  const moveIndex = cellsArray.indexOf(element);
  if (!isMoveValid(moveIndex, gameBoard)) {
    return gameBoard;
  }
  newGameBoard[moveIndex] = nextPlayerSymbol;
  element.innerText = nextPlayerSymbol;
  nextPlayerSymbol = nextPlayerSymbol === "X" ? "O" : "X";
  const nextPlayer = document.querySelector("#next-player");
  nextPlayer.innerText = `Next player: ${nextPlayerSymbol}`;
  return newGameBoard;
}

function hasLastMoverWon(lastMove, gameBoard) {
  let winnerCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [i1, i2, i3] of winnerCombos) {
    if (
      gameBoard[i1] === lastMove &&
      gameBoard[i1] === gameBoard[i2] &&
      gameBoard[i1] === gameBoard[i3]
    ) {
      return true;
    }
  }
  return false;
}

function isGameOver(gameBoard, currentPlayerSymbol) {
  if (hasLastMoverWon(currentPlayerSymbol, gameBoard)) {
    const winnerDiv = document.querySelector("#js-winner");
    winnerDiv.innerText = `Congratulations, ${currentPlayerSymbol} has won the game`;
    return true;
  }
  if (gameBoard.every((element) => element !== null)) {
    alert(`Draw. Game over.`);
    return true;
  }

  return false;
}

let gameBoard = new Array(9).fill(null);
let gameOver = false;
let currentPlayerSymbol;

function clickHandler(event) {
  event.preventDefault();
  if (gameOver === true) return;
  currentPlayerSymbol = currentPlayerSymbol === "X" ? "O" : "X";
  gameBoard = makeAMove(gameBoard, currentPlayerSymbol, event.srcElement);
  gameOver = isGameOver(gameBoard, currentPlayerSymbol);
}

$cells.forEach(($cell) => $cell.addEventListener("click", clickHandler));
