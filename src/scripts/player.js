import { Gameboard } from "./gameboard.js";

function Player() {
  const gb = Gameboard();

  // For now just populate each player’s Gameboard with predetermined coordinates
  gb.placeShip(3, 2, 3, "v");
  gb.placeShip(1, 5, 4, "h");
  gb.placeShip(7, 8, 2, "v");

  // returns each cell in the board in an object also containing it's coordinate
  const getCells = () => {
    const cells = [];
    for (let row in gb.getBoard()) {
      let col = 0; // to keep track of the current column
      gb.getBoard()[row].forEach((cell) => {
        cells.push({ type: cell, coordinate: [row, col] });
        col++;
      });
    }
    return cells;
  };

  return { getCells };
}

export { Player };
