function renderBoard(board) {
  let innerHtml = `<pre>${getBoardString(board)}</pre>`;
  document.querySelector(".js-container").innerHTML = innerHtml;
}

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

function getUserInput(nextPlayerSymbol, gameBoard) {
  return +prompt(
    `Board:\n${getBoardString(
      gameBoard
    )} Enter ${nextPlayerSymbol}'s next move (1-9):`
  );
}

function isMoveValid(move, gameBoard) {
  const boardIndex = move - 1;

  return (
    typeof move === "number" &&
    move >= 1 &&
    move <= 9 &&
    gameBoard[boardIndex] === null
  );
}

function makeAMove(gameBoard, nextPlayerSymbol) {
  const newGameBoard = [...gameBoard];
  let move = null;
  do {
    move = getUserInput(nextPlayerSymbol, gameBoard);
  } while (!isMoveValid(move, gameBoard));
  const boardIndex = move - 1;
  newGameBoard[boardIndex] = nextPlayerSymbol;
  renderBoard(newGameBoard);
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
    [2, 4, 6]
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
    alert(`Congratulations, ${currentPlayerSymbol} has won the game`);
    return true;
  }
  if (gameBoard.every((element) => element !== null)) {
    alert(`Draw. Game over.`);
    return true;
  }

  return false;
}

function ticTacToe() {
  // State space
  let gameBoard = new Array(9).fill(null);
  let currentPlayerSymbol = null;

  // Computations
  renderBoard(gameBoard);
  do {
    currentPlayerSymbol = currentPlayerSymbol === "X" ? "O" : "X";
    gameBoard = makeAMove(gameBoard, currentPlayerSymbol);
  } while (!isGameOver(gameBoard, currentPlayerSymbol));
}

ticTacToe();
