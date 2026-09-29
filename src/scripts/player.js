import { Gameboard } from "./gameboard.js";

function Player() {
  const gb = Gameboard();

  // returns all the cells in the board
  const getCells = () => {
    let cells = [];
    for (let row of gb.getBoard()) {
      for (let cell of row) {
        cells.push(cell);
      }
    }
    return cells;
  };

  return { getCells };
}

export { Player };
