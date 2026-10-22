import { Ship } from "./ship.js";

// return an array of all the coordinates in a 2d 10x10 board
function getAllBoardCoordinates() {
  let coords = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      coords.push(JSON.stringify([i, j]));
    }
  }
  return coords;
}

function Gameboard() {
  // board will be a 10x10 2d array
  let board = Array.from({ length: 10 }, () => new Array(10).fill(null));
  let missedShots = [];
  let ships = [];
  let exploredCoordinates = new Set();
  let unexploredCoordinates = new Set(getAllBoardCoordinates());

  // returns true or false depending on if the given row or column is out of the board
  const shipIsOutOfBounds = (row, col) => {
    if (row < 0 || row > 9 || col < 0 || col > 9) return true;
    return false;
  };

  // for checking if you can create a ship at the given coordinate
  const placeShipIsPossible = (row, col, len, dir) => {
    if (dir == "h") {
      while (len !== 0) {
        // if the current coordinate on the board is not empty, return false
        if (shipIsOutOfBounds(row, col) || board[row][col] !== null)
          return false;
        (col++, len--);
      }
    }
    // else, meaning the direction is vertical
    else {
      while (len !== 0) {
        if (shipIsOutOfBounds(row, col) || board[row][col] !== null)
          return false;
        (row++, len--);
      }
    }
    return true;
  };

  // places a new ship at the given coordinate in board
  const placeShip = (row, col, ship_len, direction) => {
    // do nothing if the given coordinate is already occupied
    if (board[row][col] !== null) return;

    // only place the ship on the board if it is possible
    if (placeShipIsPossible(row, col, ship_len, direction)) {
      const ship = new Ship(ship_len, direction);
      // if direction is horizontal
      if (direction === "h") {
        for (let i = ship_len; i > 0; i--) {
          board[row][col] = ship;
          col++;
        }
      }
      // else direction is vertical
      else {
        for (let i = ship_len; i > 0; i--) {
          board[row][col] = ship;
          row++;
        }
      }
      ships.push(ship);
    }
  };

  // function for if the given coordinate contains a ship, call hit() on that ship
  const receiveAttack = (row, col) => {
    exploredCoordinates.add(JSON.stringify([row, col]));
    unexploredCoordinates.delete(JSON.stringify([row, col]));
    // if the coordinate is empty, just add coordinate to missedShots
    if (board[row][col] === null) {
      missedShots.push([row, col]);
      return;
    }

    board[row][col].hit();
  };

  // returns true or false whether or not all of their ships have been sunk.
  const allShipsSunk = () => {
    // if ships is empty, return true
    if (ships.length === 0) return true;

    for (let ship of ships) {
      if (ship.is_sunk === false) return false;
    }
    return true;
  };

  const getBoard = () => board;

  // resets board, missedShots and exploredCoordinates
  const reset = () => {
    board = Array.from({ length: 10 }, () => new Array(10).fill(null));
    missedShots = [];
    ships.splice(0, ships.length);
    exploredCoordinates.clear();
    getAllBoardCoordinates().forEach((i) => unexploredCoordinates.add(i));
  };

  return {
    getBoard,
    placeShip,
    receiveAttack,
    allShipsSunk,
    missedShots,
    exploredCoordinates,
    placeShipIsPossible,
    ships,
    reset,
    unexploredCoordinates,
  };
}

export { Gameboard, getAllBoardCoordinates };
