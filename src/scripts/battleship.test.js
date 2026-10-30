import { test, expect, jest } from "@jest/globals";
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

test("receiveAttack updates the amount of sunkShips if the attacked ship is was considered sunk", () => {
  const g = Gameboard();
  g.placeShip(0, 0, 1, "h");
  g.receiveAttack(0, 0);
  expect(g.getSunkShips()).toBe(1);
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

test("Player's unexploredCoordinates has all coordinates in the board as unexplored by default", () => {
  const p = Player();
  const mockFunc = jest.fn(() => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        expect(p.getUnexploredCoordinates.has(`${i}, ${j}`));
      }
    }
  });

  mockFunc();
});

test("getRandomUnexploredCoordinate returns a random unexplored coordinate in the board", () => {
  const p = Player();
  const mockFunc = jest.fn(() => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (i === 6 && j === 7) continue;
        else p.attack([i, j]);
      }
    }
  });
  mockFunc();
  const coord = p.getRandomUnexploredCoordinate();
  expect(coord).toStrictEqual([6, 7]);
});

test("getRandomUnexploredCoordinate removes the generated coordinate from the gameboard's unexploredCoordinates", () => {
  const p = Player();
  const randCoord = p.getRandomUnexploredCoordinate();
  expect(p.getUnexploredCoordinates.has(JSON.stringify(randCoord))).toBe(false);
});

test("reset() resets the whole gameboard", () => {
  const g = Gameboard();
  g.placeShip(0, 0, 1);
  g.placeShip(0, 1, 1);
  g.receiveAttack(0, 0);
  g.reset();

  expect(g.getBoard()).toStrictEqual(
    Array.from({ length: 10 }, () => new Array(10).fill(null)),
  );
  expect(g.missedShots).toStrictEqual([]);
  expect(g.ships).toStrictEqual([]);
  expect(g.exploredCoordinates.size).toBe(0);
  expect(g.unexploredCoordinates.size).toBe(100);
  expect(g.getSunkShips()).toBe(0);
});
