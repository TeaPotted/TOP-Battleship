import { Ship } from "./ship";

test("hit() incremenents the times the ship has been hit", () => {
  const s = new Ship(3);
  s.hit();
  expect(s.times_hit).toBe(1);
});

test("hit() considers the ship as sunk if isSunk() returns true", () => {
  const s = new Ship(1);
  s.hit();
  expect(s.is_sunk).toBe(true);
});

test("isSunk() return true if the ship is sunk and false if not", () => {
  const s = new Ship(2);
  s.hit();
  expect(s.isSunk()).toBe(false);
  s.hit();
  expect(s.isSunk()).toBe(true);
});
