import { Gameboard } from "./gameboard.js";

test("placeShip() places a new ship at the given coordinate in the board", () => {
  const g = Gameboard();
  g.placeShip(0, 9, 3);
  const s = g.getBoard()[0][9];
  expect(s.length).toBe(3);
  expect(s.times_hit).toBe(0);
  expect(s.is_sunk).toBe(false);
});

test("placeShip() does nothing if the given coordinate is already occupied", () => {
  const g = Gameboard();
  g.placeShip(0, 0, 1);
  g.placeShip(0, 0, 3);
  const s = g.getBoard()[0][0];
  expect(s.length).toBe(1);
  expect(s.times_hit).toBe(0);
  expect(s.is_sunk).toBe(false);
});

test("receiveAttack() calls the hit function on the ship at the given coordinate", () => {
  const g = Gameboard();
  g.placeShip(0, 0, 1);
  g.receiveAttack(0, 0);
  expect(g.getBoard()[0][0].times_hit).toBe(1);
});

test("allShipsSunk() returns true if all ships in the board have been sunk", () => {
  const g = Gameboard();
  g.placeShip(0, 0, 1);
  g.placeShip(1, 0, 1);
  g.receiveAttack(0, 0);
  g.receiveAttack(1, 0);

  expect(g.allShipsSunk()).toBe(true);
});

test("allShipsSunk() returns false if all ships in the board are not sunk", () => {
  const g = Gameboard();
  g.placeShip(0, 0, 1);
  g.placeShip(0, 1, 1);
  g.receiveAttack(0, 0);
  expect(g.allShipsSunk()).toBe(false);
});
