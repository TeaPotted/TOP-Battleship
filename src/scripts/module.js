import { Player } from "./player.js";
import {
  createInputContainer,
  createDirectionContainer,
  createButton,
} from "./create-elems.js";

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

    renderPlayerBoard(playerBoard);
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

  // displays the .create-ships div
  const displayShipCreator = () => {
    const container = document.createElement("div");
    container.classList.add("create-ships");
    const p = (document.createElement("p").textContent = "Create Ship");
    const lengthInputContainer = createInputContainer(
      "length",
      "Ship Length:",
      "number",
    );
    const directionContainer = createDirectionContainer();
    const rowInputContainer = createInputContainer("row", "Row:", "number");
    const collumnInputContainer = createInputContainer(
      "col",
      "Collumn:",
      "number",
    );

    const placeBtn = createButton("Place Ship");
    const resetBtn = createButton("Reset");

    // initially set input values
    lengthInputContainer.querySelector("input").value = "3";
    directionContainer.querySelector("select").value = "v";
    rowInputContainer.querySelector("input").value = "3";
    collumnInputContainer.querySelector("input").value = "4";

    placeBtn.addEventListener("click", () =>
      placeShip(
        lengthInputContainer.querySelector("input").value,
        directionContainer.querySelector("select").value,
        rowInputContainer.querySelector("input").value,
        collumnInputContainer.querySelector("input").value,
      ),
    );
    resetBtn.addEventListener("click", resetBoard);
    container.append(
      p,
      lengthInputContainer,
      directionContainer,
      rowInputContainer,
      collumnInputContainer,
      placeBtn,
      resetBtn,
    );
    return container;
  };

  // places a new Ship to the player's board
  const placeShip = (len, dir, row, col) => {
    player1.placeShip(len, dir, Number(row), Number(col));
    const playerBoardDiv = document.querySelector(".board.player");
    // display the updated board
    playerBoardDiv.textContent = "";
    renderPlayerBoard(playerBoardDiv);
  };

  // resets the player's board and .create-ships inputs
  const resetBoard = () => {
    // reset player
    player1 = new Player();
    document.querySelector(".board.player").textContent = "";
    renderPlayerBoard(document.querySelector(".board.player"));

    document.querySelector("#length").value = "";
    document.querySelector("#direction").value = "h";
    document.querySelector("#row").value = "";
    document.querySelector("#col").value = "";
  };

  const startGame = () => {
    // display the player and computer boards then remove start button
    document.querySelector(".boards-container").textContent = "";
    document.body.removeChild(document.querySelector("button"));
    displayBoards();
  };

  const displayStartScreen = () => {
    const playerBoard = document.createElement("div");
    playerBoard.classList.add("player", "board");
    renderPlayerBoard(playerBoard);
    boardsDiv.append(playerBoard, displayShipCreator());
    const startBtn = createButton("start");
    startBtn.addEventListener("click", () => startGame());
    document.body.append(startBtn);

    // place random ships to the computer's board
    compPlayer.randomlyPlaceShips();
  };
  return { displayBoards, displayStartScreen };
}

export { RenderGame };
