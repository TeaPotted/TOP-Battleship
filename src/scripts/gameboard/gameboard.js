import { Ship } from "../ship/ship.js";

function Gameboard() {
  // board will be a 10x10 2d array
  const board = Array.from({ length: 10 }, () => new Array(10).fill(null));
  const missedShots = [];
  const ships = [];

  // places a new ship at the given coordinate in board
  const placeShip = (row, col, ship_len, direction) => {
    // do nothing if the given coordinate is already occupied
    if (board[row][col] !== null) return;
    board[row][col] = new Ship(ship_len, direction);
    ships.push(board[row][col]);
  };

  // function for if the given coordinate contains a ship, call hit() on that ship
  const receiveAttack = (row, col) => {
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

  return { getBoard, placeShip, receiveAttack, allShipsSunk };
}
const g = Gameboard();
g.placeShip(0, 0, 1);
g.receiveAttack(0, 0);
g.placeShip(0, 1, 2);

export { Gameboard };
