import { Ship } from "./ship.js";

function Gameboard() {
  // board will be a 10x10 2d array
  const board = Array.from({ length: 10 }, () => new Array(10).fill(null));
  const missedShots = [];
  const ships = [];
  const exploredCoordinates = new Set();

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
        if (board[row][col] !== null || shipIsOutOfBounds(row, col))
          return false;
        (col++, len--);
      }
    }
    // else, meaning the direction is vertical
    else {
      while (len !== 0) {
        if (board[row][col] !== null || shipIsOutOfBounds(row, col))
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

  return {
    getBoard,
    placeShip,
    receiveAttack,
    allShipsSunk,
    missedShots,
    exploredCoordinates,
  };
}

export { Gameboard };
