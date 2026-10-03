import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";

test("hit() incremenents the times the ship has been hit", () => {
  const s = new Ship(3, "h");
  s.hit();
  expect(s.times_hit).toBe(1);
});

test("hit() considers the ship as sunk if isSunk() returns true", () => {
  const s = new Ship(1, "h");
  s.hit();
  expect(s.is_sunk).toBe(true);
});

test("isSunk() return true if the ship is sunk and false if not", () => {
  const s = new Ship(2, "h");
  s.hit();
  expect(s.isSunk()).toBe(false);
  s.hit();
  expect(s.isSunk()).toBe(true);
});

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

test("getUnexploredCoordinate returns a random unexlplored coordinate in the board", () => {
  const p = Player();

  p.attack([0, 0]);
  p.attack([0, 1]);
  p.attack([0, 2]);
  p.attack([0, 3]);
  p.attack([0, 4]);
  p.attack([0, 5]);
  p.attack([0, 6]);
  p.attack([0, 7]);
  p.attack([0, 8]);
  p.attack([0, 9]);
  p.attack([1, 0]);
  p.attack([1, 1]);
  p.attack([1, 2]);
  p.attack([1, 3]);
  p.attack([1, 4]);
  p.attack([1, 5]);
  p.attack([1, 6]);
  p.attack([1, 7]);
  p.attack([1, 8]);
  p.attack([1, 9]);
  p.attack([2, 0]);
  p.attack([2, 1]);
  p.attack([2, 2]);
  p.attack([2, 3]);
  p.attack([2, 4]);
  p.attack([2, 5]);
  p.attack([2, 6]);
  p.attack([2, 7]);
  p.attack([2, 8]);
  p.attack([2, 9]);
  p.attack([3, 0]);
  p.attack([3, 1]);
  p.attack([3, 2]);
  p.attack([3, 3]);
  p.attack([3, 4]);
  p.attack([3, 5]);
  p.attack([3, 6]);
  p.attack([3, 7]);
  p.attack([3, 8]);
  p.attack([3, 9]);
  p.attack([4, 0]);
  p.attack([4, 1]);
  p.attack([4, 2]);
  p.attack([4, 3]);
  p.attack([4, 4]);
  p.attack([4, 5]);
  p.attack([4, 6]);
  p.attack([4, 7]);
  p.attack([4, 8]);
  p.attack([4, 9]);
  p.attack([5, 0]);
  p.attack([5, 1]);
  p.attack([5, 2]);
  p.attack([5, 3]);
  p.attack([5, 4]);
  p.attack([5, 5]);
  p.attack([5, 6]);
  p.attack([5, 7]);
  p.attack([5, 8]);
  p.attack([5, 9]);
  p.attack([6, 0]);
  p.attack([6, 1]);
  p.attack([6, 2]);
  p.attack([6, 3]);
  p.attack([6, 4]);
  p.attack([6, 5]);
  p.attack([6, 6]);
  p.attack([6, 8]);
  p.attack([6, 9]);
  p.attack([7, 0]);
  p.attack([7, 1]);
  p.attack([7, 2]);
  p.attack([7, 3]);
  p.attack([7, 4]);
  p.attack([7, 5]);
  p.attack([7, 6]);
  p.attack([7, 7]);
  p.attack([7, 8]);
  p.attack([7, 9]);
  p.attack([8, 0]);
  p.attack([8, 1]);
  p.attack([8, 2]);
  p.attack([8, 3]);
  p.attack([8, 4]);
  p.attack([8, 5]);
  p.attack([8, 6]);
  p.attack([8, 7]);
  p.attack([8, 8]);
  p.attack([8, 9]);
  p.attack([9, 0]);
  p.attack([9, 1]);
  p.attack([9, 2]);
  p.attack([9, 3]);
  p.attack([9, 4]);
  p.attack([9, 5]);
  p.attack([9, 6]);
  p.attack([9, 7]);
  p.attack([9, 8]);
  p.attack([9, 9]);
  expect(p.getRandomUnexploredCoordinate()).toStrictEqual([6, 7]);
});
