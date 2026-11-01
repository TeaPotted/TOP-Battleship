import { Player } from "./player.js";
import { createButton } from "./create-elems.js";
import { displayShips, renderPlayerBoard } from "./start-modules.js";
import { computerMakeAttack } from "./computer.js";

function RenderGame() {
  let player1 = Player();
  const compPlayer = Player();
  let turn = "player";
  let endGame = false;
  const boardsDiv = document.querySelector(".boards-container");

  // function for displaying both the player's and computer's board on the DOM
  const displayBoards = () => {
    const playerBoard = document.createElement("div");
    playerBoard.classList.add("board", "player");
    const computerBoard = document.createElement("div");
    computerBoard.classList.add("board", "computer");

    renderPlayerBoard(player1, playerBoard);
    renderComputerBoard(computerBoard);
    boardsDiv.append(playerBoard, computerBoard);
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
          computerMakeAttack(
            turn,
            endGame,
            player1,
            checkGameStatus,
            switchTurn,
          );
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

  const startGame = () => {
    // display the player and computer boards then remove start button
    document.querySelector(".boards-container").textContent = "";
    const startBtn = document.querySelector("button.start");
    const resetBtn = document.querySelector("button.reset");
    startBtn.parentNode.removeChild(startBtn);
    resetBtn.parentNode.removeChild(resetBtn);
    displayBoards();
  };

  // displays the player's board, the draggable ships container and the start and reset buttons
  const displayStartScreen = () => {
    const playerBoard = document.createElement("div");
    playerBoard.classList.add("player", "board");
    renderPlayerBoard(player1, playerBoard);
    boardsDiv.append(playerBoard, displayShips());
    const startBtn = createButton("start");
    startBtn.addEventListener("click", startGame);
    startBtn.classList.add("start");
    const resetBtn = createButton("reset");
    resetBtn.classList.add("reset");
    // resets the player's board and .ships-container
    resetBtn.addEventListener("click", () => {
      player1.resetPlayer();
      playerBoard.textContent = "";
      renderPlayerBoard(player1, playerBoard);
      const shipsContainer = document.querySelector(".ships-container");
      shipsContainer.parentNode.removeChild(shipsContainer);
      boardsDiv.append(displayShips());
    });
    document.body.append(startBtn, resetBtn);

    // place random ships to the computer's board
    compPlayer.randomlyPlaceShips();
  };
  return { displayBoards, displayStartScreen };
}

export { RenderGame };
