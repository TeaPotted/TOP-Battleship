import { Ship } from "./ship";

test("hit() incremenents the times the ship has been hit", () => {
  const s = new Ship(3);
  s.hit();
  expect(s.ship).toEqual({ length: 3, times_hit: 1, is_sunk: false });
});

test("isSunk() return true if the ship is sunk and false if not", () => {
  const s = new Ship(2);
  s.hit();
  expect(s.isSunk()).toBe(false);
  s.hit();
  expect(s.isSunk()).toBe(true);
});
