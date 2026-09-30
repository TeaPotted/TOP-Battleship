import { Gameboard } from "./gameboard.js";

function Player() {
  const gb = Gameboard();

  // For now just populate each player’s Gameboard with predetermined coordinates 
  gb.placeShip(3, 2, 3, "v")
  gb.placeShip(1, 5, 4, "h")
  gb.placeShip(7, 8, 2, "v")

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
