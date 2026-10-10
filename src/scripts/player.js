import { Gameboard } from "./gameboard.js";

function Player() {
  const gb = Gameboard();

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

  const allShipsSunk = () => gb.allShipsSunk();

  const placeShip = (length, direction, row, col) => {
    gb.placeShip(row, col, length, direction);
  };

  // returns a random empty coordinate in the player's board
  const getRandomEmptyCoordinate = () => {
    let randomCoord = [getRandomNum(), getRandomNum()];
    // generate a new random empty coordinate
    while (getCell(randomCoord[0], randomCoord[1]) !== null) {
      randomCoord = [getRandomNum(), getRandomNum()];
    }
    return randomCoord;
  };

  // returns a random row, col, length and direction for a ship
  const randomlyPlaceShip = () => {
    const [row, col] = getRandomEmptyCoordinate();
    const directions = ["h", "v"];
    let len = getRandomNum() + 1;
    let dir = directions[Math.floor(Math.random() * directions.length)];
    // keep generating a new length and direction until it is possible to place a ship with len and dir
    while (gb.placeShipIsPossible(row, col, len, dir) === false) {
      len = getRandomNum() + 1;
      dir = directions[Math.floor(Math.random() * directions.length)];
    }

    console.log("ship:", row, col, len, dir);
    gb.placeShip(row, col, len, dir);
  };

  // randomly places 5 ships to the player's board
  const randomlyPlaceShips = () => {
    randomlyPlaceShip();
    randomlyPlaceShip();
    randomlyPlaceShip();
    randomlyPlaceShip();
    randomlyPlaceShip();
  };
  return {
    getCells,
    attack,
    getMissedShots,
    getExploredCoordinates,
    getCell,
    getRandomUnexploredCoordinate,
    allShipsSunk,
    placeShip,
    randomlyPlaceShips,
  };
}

export { Player };
