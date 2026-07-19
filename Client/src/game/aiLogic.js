export function computerMove(board) {
  const emptyCells = board
    .map((cell, index) => {
      if (cell === "") {
        return index;
      }
      return null;
    })
    .filter((index) => index !== null);

  const randomMove =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];

  return randomMove;
}
