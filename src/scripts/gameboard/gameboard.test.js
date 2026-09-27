import { Gameboard } from "./gameboard.js";

test("placeShip() places a new ship at the given coordinate in the board", () => {
  const g = Gameboard();
  g.placeShip(0, 9, 1, "h");
  const s = g.getBoard()[0][9];
  expect(s.length).toBe(1);
  expect(s.times_hit).toBe(0);
  expect(s.is_sunk).toBe(false);
  expect(s.direction).toBe("h");
});

test("placeShip() does nothing if the given coordinate is already occupied", () => {
  const g = Gameboard();
  g.placeShip(0, 0, 1, "v");
  g.placeShip(0, 0, 3, "h");
  const s = g.getBoard()[0][0];
  expect(s.length).toBe(1);
  expect(s.times_hit).toBe(0);
  expect(s.is_sunk).toBe(false);
  expect(s.direction).toBe("v");
});

test("placeShip() places a new ship spanning through multiple coordinates in the board if ship's length is more than 1", () => {
  const g = Gameboard();
  g.placeShip(0, 0, 3, "h");
  expect(g.getBoard()[0][0].length).toBe(3);
  expect(g.getBoard()[0][1].length).toBe(3);
  expect(g.getBoard()[0][2].length).toBe(3);

  g.placeShip(1, 0, 2, "v");
  expect(g.getBoard()[1][0].length).toBe(2);
  expect(g.getBoard()[2][0].length).toBe(2);
});

test("placeShip() does nothing if the created ship is out of bounds", () => {
  const g = Gameboard();
  g.placeShip(0, 9, 2, "h");
  expect(g.getBoard()[0][9]).toBe(null);
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
