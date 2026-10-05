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
        cells.push({ type: cell, coordinate: [Number(row), col] });
        col++;
      });
    }
    return cells;
  };

  // returns the cell at the given coordinate
  const getCell = (row, col) => {
    return gb.getBoard()[row][col];
  };

  // calls receiveAttack on the board with the given coordinate
  const attack = (coordinate) => {
    const [row, col] = coordinate;
    gb.receiveAttack(row, col);
  };

  // returns a random number from 0 to 9
  const getRandomNum = () => {
    return Math.floor(Math.random() * 10);
  };

  // returns a random coordinate in the player's board that hasn't been explored before
  const getRandomUnexploredCoordinate = () => {
    const exploredCoords = getExploredCoordinates();
    let rand1 = getRandomNum();
    let rand2 = getRandomNum();
    // keep creating different a new random coordinate until random coordinate is not in exploredCoords
    while (exploredCoords.has(JSON.stringify([rand1, rand2]))) {
      rand1 = getRandomNum();
      rand2 = getRandomNum();
    }
    exploredCoords.add(JSON.stringify([rand1, rand2]));
    return [rand1, rand2];
  };

  // returns the board's missed shots
  const getMissedShots = () => gb.missedShots;

  const getExploredCoordinates = () => gb.exploredCoordinates;
  return {
    getCells,
    attack,
    getMissedShots,
    getExploredCoordinates,
    getCell,
    getRandomUnexploredCoordinate,
  };
}

export { Player };
