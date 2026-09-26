class Ship {
  constructor(length, times_hit = 0, is_sunk = false) {
    this.length = length;
    this.times_hit = times_hit;
    this.is_sunk = is_sunk;

    // Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk
    this.ship = {
      length: this.length,
      times_hit: this.times_hit,
      is_sunk: this.is_sunk,
    };
  }

  // hit() increments the ship's times_hit valie
  hit = () => {
    this.ship.times_hit++;
    // if the ship is considered sunk, call isSunk
    this.isSunk();
  };

  // isSunk() returns true or false depending on if the ship considered sunk
  isSunk() {
    // if the times_hit is greater or equal to the ship's length, update is_sunk and return true
    if (this.ship.times_hit >= this.ship.length) {
      this.is_sunk = true;
      return true;
    }

    return false;
  }
}

export { Ship };
