import { Player } from "./player.js";
import { displayShips, renderPlayerBoard } from "./start-modules.js";
import { computerMakeAttack, timeOut } from "./computer.js";

function RenderGame() {
  let player1 = Player();
  const compPlayer = Player();
  let turn = "player";
  let endGame = false;

  // function for displaying both the player's and computer's board on the DOM
  const getBoards = () => {
    const playerBoard = document.createElement("div");
    playerBoard.classList.add("board", "player");
    const computerBoard = document.createElement("div");
    computerBoard.classList.add("board", "computer");

    renderPlayerBoard(player1, playerBoard);
    renderComputerBoard(computerBoard);
    return [playerBoard, computerBoard];
  };

  // stops the game if either players ships have all been sunk
  const checkGameStatus = () => {
    if (player1.allShipsSunk() || compPlayer.allShipsSunk()) {
      endGame = true;
      console.log(`${turn} wins!`);
    }
  };

  const switchTurn = () => {
    turn === "player" ? (turn = "computer") : (turn = "player");
    document.querySelector("#turn").textContent = turn;
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

  // resets the whole game before displayng back the title screen
  const resetGame = () => {
    clearTimeout(timeOut);
    turn = "player";
    endGame = false;
    player1.resetPlayer();
    compPlayer.resetPlayer();
    document.querySelector(".game-container").remove();
    document.querySelector(".titleScreen-container").style.display = "flex";
  };

  const startGame = () => {
    document.querySelector(".startScreen-container").remove();
    const [playerBoard, computerBoard] = getBoards();

    // display the player and computer's board and the quit button
    const displayGameContainer = document.createElement("div");
    displayGameContainer.classList.add("game-container");
    // p.display-turn
    const displayTurn = document.createElement("p");
    displayTurn.classList.add("display-turn");
    displayTurn.innerHTML = `<span id="turn">${turn}</span>'s turn`;

    // boards-container
    const boardsContainerDiv = document.createElement("div");
    boardsContainerDiv.classList.add("boards-container");

    // player's container
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("container");
    const youPara = document.createElement("p");
    youPara.textContent = "YOU";
    const playerShipsLeftPara = document.createElement("p");
    playerShipsLeftPara.innerHTML = `Ships left: <span id="player-shipsLeft">${player1.getShipsLeft()}</span>`;
    playerContainer.append(youPara, playerBoard, playerShipsLeftPara);

    // computer's container
    const computerContainer = document.createElement("div");
    computerContainer.classList.add("container");
    const computerPara = document.createElement("p");
    computerPara.textContent = "COMPUTER";
    const compShipsLeftPara = document.createElement("p");
    compShipsLeftPara.innerHTML = `Ships left: <span id="computer-shipsLeft">${compPlayer.getShipsLeft()}</span>`;
    computerContainer.append(computerPara, computerBoard, compShipsLeftPara);

    boardsContainerDiv.append(playerContainer, computerContainer);
    const quitBtn = document.createElement("button");
    quitBtn.classList.add("quit");
    quitBtn.textContent = "QUIT";
    quitBtn.addEventListener("click", resetGame);

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
    const startScreenContainer = document.createElement("div");
    startScreenContainer.classList.add("startScreen-container");

    // boards container
    const boardsContainerDiv = document.createElement("div");
    boardsContainerDiv.classList.add("boards-container");

    // player container
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("container");
    const playerPara = document.createElement("p");
    playerPara.textContent = "YOUR BOARD";
    const playerBoard = document.createElement("div");
    playerBoard.classList.add("player", "board");
    renderPlayerBoard(player1, playerBoard);
    playerContainer.append(playerPara, playerBoard);

    // ships container
    const shipsContainer = document.createElement("div");
    shipsContainer.classList.add("container");
    const shipsPara = document.createElement("p");
    shipsPara.textContent = "drag a ship to your board";
    shipsContainer.append(shipsPara, displayShips(playerContainer.offsetWidth));

    boardsContainerDiv.append(playerContainer, shipsContainer);

    // buttons container
    const buttonsDiv = document.createElement("div");
    const startBtn = document.createElement("button");
    startBtn.classList.add("start");
    startBtn.textContent = "START";
    const resetBtn = document.createElement("button");
    resetBtn.classList.add("reset");
    resetBtn.textContent = "RESET";

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
    startScreenContainer.append(boardsContainerDiv, buttonsDiv);
    document.body.append(startScreenContainer);
    compPlayer.randomlyPlaceShips();
  };
  return { getBoards, displayStartScreen, startGame };
}

export { RenderGame };
