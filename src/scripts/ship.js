class Ship {
  constructor(length, direction, times_hit = 0, is_sunk = false) {
    this.length = length;
    this.times_hit = times_hit;
    this.is_sunk = is_sunk;
    this.direction = direction;
  }

  // hit() increments the ship's times_hit valie
  hit = () => {
    this.times_hit++;
    // if the ship is considered sunk, call isSunk
    this.isSunk();
  };

  // isSunk() returns true or false depending on if the ship considered sunk
  isSunk() {
    // if the times_hit is greater or equal to the ship's length, update is_sunk and return true
    if (this.times_hit >= this.length) {
      this.is_sunk = true;
      return true;
    }

    return false;
  }
}

export { Ship };
