let queue;
let nextCoord;

// returns all possible moves you can make in the board from the given coordinate
function getAdjacentCoords(startCoord) {
  const [row, col] = startCoord;
  let moves = [];

  // push coordinates to the left, top, right and bottom of the start coord
  moves.push([row, col - 1]);
  moves.push([row - 1, col]);
  moves.push([row, col + 1]);
  moves.push([row + 1, col]);

  // remove all illegal moves from the array and return it
  moves = moves.filter((move) => {
    if (move[0] > -1 && move[0] < 10 && move[1] > -1 && move[1] < 10)
      return move;
  });
  return moves;
}

//
function getNextCoordinateToAttack(coordinate, visited, coordType) {
  if (!queue || queue.length === 0) queue = getAdjacentCoords(coordinate);
  else if (coordType === "ship") {
    queue.push(
      ...getAdjacentCoords(coordinate).filter(
        (i) => !visited.has(JSON.stringify(i)),
      ),
    );
  }
  nextCoord = queue.shift();
  while (visited.has(JSON.stringify(nextCoord))) {
    nextCoord = queue.shift();
  }
}

function resetNextCoorAndQueue() {
  nextCoord = null;
  queue = [];
}

// makes the computer make an attack to the player's board
function computerMakeAttack(
  turn,
  endGame,
  player,
  checkGameStatus,
  switchTurn,
) {
  if (turn == "player") return;

  if (endGame === false) {
    // get random unexplored coordinate in the players board
    const [row, col] = nextCoord
      ? nextCoord
      : player.getRandomUnexploredCoordinate();
    const playerSunkShips = player.getSunkShips();
    player.attack([row, col]);

    // find the div that contains the random coordinate
    const div = document.querySelector(
      `.board.player div[data-coordinate="${[row, col]}"`,
    );

    // wait a few seconds before switching turns
    setTimeout(() => {
      // if the attacked coordinate was a ship, give div a class of 'hit'
      if (player.getCell(row, col) !== null) {
        div.classList.add("hit");
        if (player.getSunkShips() > playerSunkShips) {
          resetNextCoorAndQueue();
        } else
          getNextCoordinateToAttack(
            [row, col],
            player.getExploredCoordinates,
            "ship",
          );
      }
      // else give a class of 'miss'
      else {
        div.classList.add("miss");

        // if queue is not empty, set nextCoord to the next value in queue
        if (queue && queue.length > 0) {
          getNextCoordinateToAttack(
            [row, col],
            player.getExploredCoordinates,
            "miss",
          );
        } else resetNextCoorAndQueue();
      }
      // check if there is a winner before switching to turn to player
      checkGameStatus();
      switchTurn();
    }, 1300);
  }
}

export { getAdjacentCoords, computerMakeAttack };
