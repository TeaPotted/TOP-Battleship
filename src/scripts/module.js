import { Player } from "./player.js";
import { createDiv, createBtn } from "./create-elems.js";
import { displayShips, renderPlayerBoard } from "./start-modules.js";
import { computerMakeAttack, timeOut } from "./computer.js";
import { displayWinScreen, displayLoseScreen } from "./end-modules.js";

function RenderGame() {
  let player1 = Player();
  const compPlayer = Player();
  let turn = "player";
  let endGame = false;

  // function for displaying both the player's and computer's board on the DOM
  const getBoards = () => {
    const playerBoard = createDiv("board", "player");
    const computerBoard = createDiv("board", "computer");

    renderPlayerBoard(player1, playerBoard);
    renderComputerBoard(computerBoard);
    return [playerBoard, computerBoard];
  };

  // stops the game if either players ships have all been sunk
  const checkGameStatus = () => {
    if (player1.allShipsSunk() || compPlayer.allShipsSunk()) {
      endGame = true;
      setTimeout(
        () =>
          turn === "player"
            ? displayWinScreen(resetGame, displayStartScreen)
            : displayLoseScreen(resetGame, displayStartScreen),
        500,
      );
    }
  };

  const switchTurn = () => {
    if (endGame === true) return;
    turn === "player" ? (turn = "computer") : (turn = "player");
    document.querySelector("#turn").textContent = turn;
  };

  // function for rendering the computers board to the DOM
  const renderComputerBoard = (computerBoardDiv) => {
    compPlayer.getCells().forEach((cell) => {
      const div = createDiv("empty");
      div.dataset.coordinate = cell.coordinate;
      // when div is clicked, call attack on the cell's coordinate and update computer's board
      div.onclick = () => {
        if (turn !== "computer" && div.classList.contains("empty")) {
          const compShipsLeftSpan = document.querySelector(
            "#computer-shipsLeft",
          );
          compPlayer.attack(cell.coordinate);
          updateComputerBoard(div, cell.coordinate);

          if (compShipsLeftSpan.textContent > compPlayer.getShipsLeft())
            compShipsLeftSpan.textContent = compPlayer.getShipsLeft();
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
        div.classList.replace("empty", "miss");
      }
      // else give a class of 'ship'
      else {
        div.classList.replace("empty", "ship");
      }
      checkGameStatus();
      switchTurn();
    }
  };

  // resets the whole game and removes .game-container from the DOM
  const resetGame = () => {
    clearTimeout(timeOut);
    turn = "player";
    endGame = false;
    player1.resetPlayer();
    compPlayer.resetPlayer();
    document.querySelector(".game-container").remove();
  };

  const startGame = () => {
    document.querySelector(".startScreen-container").remove();
    const [playerBoard, computerBoard] = getBoards();

    // display the player and computer's board and the quit button
    const displayGameContainer = createDiv("game-container");
    // p.display-turn
    const displayTurn = document.createElement("p");
    displayTurn.classList.add("display-turn");
    displayTurn.innerHTML = `<span id="turn">${turn}</span>'s turn`;

    // boards-container
    const boardsContainerDiv = createDiv("boards-container");

    // player's container
    const playerContainer = createDiv("container");
    const youPara = document.createElement("p");
    youPara.textContent = "YOU";
    const playerShipsLeftPara = document.createElement("p");
    playerShipsLeftPara.innerHTML = `Ships left: <span id="player-shipsLeft">${player1.getShipsLeft()}</span>`;
    playerContainer.append(youPara, playerBoard, playerShipsLeftPara);

    // computer's container
    const computerContainer = createDiv("container");
    const computerPara = document.createElement("p");
    computerPara.textContent = "COMPUTER";
    const compShipsLeftPara = document.createElement("p");
    compShipsLeftPara.innerHTML = `Ships left: <span id="computer-shipsLeft">${compPlayer.getShipsLeft()}</span>`;
    computerContainer.append(computerPara, computerBoard, compShipsLeftPara);

    boardsContainerDiv.append(playerContainer, computerContainer);
    const quitBtn = createBtn("QUIT", "quit");
    quitBtn.addEventListener("click", () => {
      resetGame();
      document.querySelector(".titleScreen-container").style.display = "flex";
    });

    // p.instruction
    const instructionP = document.createElement("p");
    instructionP.textContent =
      "click a square in the computer's board to make an attack";
    instructionP.classList.add("instruction");

    displayGameContainer.append(
      displayTurn,
      boardsContainerDiv,
      instructionP,
      quitBtn,
    );
    document.body.append(displayGameContainer);
  };

  // appends a p.error element to the given div
  const showErrorMsg = (message, divToDisplay) => {
    if (
      document.querySelector(".startScreen-container").querySelector("p.error")
    )
      return;
    const msg = document.createElement("p");
    msg.classList.add("error");
    msg.textContent = message;

    divToDisplay.append(msg);
  };

  // displays the player's board, the draggable ships container and the start and reset buttons
  const displayStartScreen = () => {
    // startScreen-container
    const startScreenContainer = createDiv("startScreen-container");

    // boards container
    const boardsContainerDiv = createDiv("boards-container");

    // player container
    const playerContainer = createDiv("container");
    const playerPara = document.createElement("p");
    playerPara.textContent = "YOUR BOARD";
    const playerBoard = createDiv("player", "board");
    renderPlayerBoard(player1, playerBoard);
    playerContainer.append(playerPara, playerBoard);

    // ships container
    const shipsContainer = createDiv("container");
    const shipsPara = document.createElement("p");
    shipsPara.textContent = "drag a ship to your board";
    shipsContainer.append(shipsPara, displayShips(playerContainer.offsetWidth));

    boardsContainerDiv.append(playerContainer, shipsContainer);

    // buttons container
    const buttonsDiv = createDiv();
    const startBtn = createBtn("START", "start");
    const resetBtn = createBtn("RESET", "reset");

    startBtn.addEventListener("click", () => {
      if (player1.getShipsLeft() > 0) startGame();
      else
        showErrorMsg("You need to place atleast 1 ship!", startScreenContainer);
    });
    resetBtn.addEventListener("click", () => {
      // reset the player's board and ships-container
      player1.resetPlayer();
      playerBoard.textContent = "";
      renderPlayerBoard(player1, playerBoard);
      shipsContainer.removeChild(document.querySelector(".ships-container"));
      shipsContainer.append(displayShips());

      if (startScreenContainer.querySelector("p.error")) {
        startScreenContainer.removeChild(
          startScreenContainer.querySelector("p.error"),
        );
      }
    });

    buttonsDiv.append(startBtn, resetBtn);

    // back button
    const backBtn = createBtn("BACK", "back");
    backBtn.addEventListener("click", () => {
      player1.resetPlayer();
      compPlayer.resetPlayer();
      startScreenContainer.remove();
      document.querySelector(".titleScreen-container").style.display = "flex";
    });

    startScreenContainer.append(boardsContainerDiv, buttonsDiv, backBtn);
    document.body.append(startScreenContainer);
    compPlayer.randomlyPlaceShips();
  };
  return { getBoards, displayStartScreen, startGame };
}

export { RenderGame };
