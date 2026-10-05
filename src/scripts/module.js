import { Player } from "./player.js";

function RenderGame() {
  const player1 = Player();
  const compPlayer = Player();
  let turn = "player";
  let endGame = false;

  // function for displaying both the player's and computer's board on the DOM
  const displayBoards = () => {
    const playerBoard = document.createElement("div");
    playerBoard.classList.add("board", "player");
    const computerBoard = document.createElement("div");
    computerBoard.classList.add("board", "computer");

    renderPlayerBoard(playerBoard);
    renderComputerBoard(computerBoard);
    document.body.append(playerBoard, computerBoard);
  };

  // stops the game if either players ships have all been sunk
  const checkGameStatus = () => {
    if (player1.allShipsSunk() || compPlayer.allShipsSunk()) {
      endGame = true;
      console.log(`${turn} wins!`);
    }
  };

  const switchTurn = () =>
    turn === "player" ? (turn = "computer") : (turn = "player");

  // function for rendering the player's board using a given div
  const renderPlayerBoard = (playerBoardDiv) => {
    const cells = player1.getCells();
    for (let cell of cells) {
      const div = document.createElement("div");
      div.dataset.coordinate = cell.coordinate;
      // if the cell is null, make div have a 'empty' class
      if (cell.type === null) {
        div.classList.add("empty");
        playerBoardDiv.append(div);
      }
      // else, append give div a 'ship' class
      else {
        div.classList.add("ship");
        playerBoardDiv.append(div);
      }
    }
  };

  // function for rendering the computers board to the DOM
  const renderComputerBoard = (computerBoardDiv) => {
    compPlayer.getCells().forEach((cell) => {
      const div = document.createElement("div");
      div.classList.add("empty");
      div.dataset.coordinate = cell.coordinate;
      // when div is clicked, call attack on the cell's coordinate and update computer's board
      div.onclick = () => {
        if (turn !== "computer") {
          compPlayer.attack(cell.coordinate);
          updateComputerBoard(div, cell.coordinate);
          computerMakeAttack();
        }
      };
      computerBoardDiv.append(div);
    });
  };

  // updates the computers board div
  const updateComputerBoard = (div, coordinate) => {
    if (endGame !== true) {
      // if the last value in the computer's missed shot array is the given coordinate,
      // add a class of 'ship' to the given div
      if (
        JSON.stringify(
          compPlayer.getMissedShots()[compPlayer.getMissedShots().length - 1],
        ) === JSON.stringify(coordinate)
      ) {
        div.classList.add("miss");
      }
      // else give a class of 'ship'
      else {
        div.classList.add("ship");
      }
      checkGameStatus();
      switchTurn();
    }
  };

  // makes an attack on the player's board as the computer
  const computerMakeAttack = () => {
    if (turn == "player") return;

    if (endGame === false) {
      // get random unexplored coordinate in the players board
      const [row, col] = compPlayer.getRandomUnexploredCoordinate();
      player1.attack([row, col]);

      // find the div that contains the random coordinate
      const div = document.querySelector(
        `.board.player div[data-coordinate="${[row, col]}"`,
      );

      // wait a few seconds before switching turns
      setTimeout(() => {
        // if the attacked coordinate was a ship, give div a class of 'hit'
        if (player1.getCell(row, col) !== null) div.classList.add("hit");
        // else give a class of 'miss'
        else div.classList.add("miss");
        checkGameStatus();
        switchTurn();
      }, 0);
    }
  };
  return { displayBoards };
}

export { RenderGame };
