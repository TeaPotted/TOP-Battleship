import { Player } from "./player.js";

function RenderGame() {
  const player1 = Player();
  const compPlayer = Player();

  // function for displaying both the player's and computer's board on the DOM
  const displayBoards = () => {
    const playerBoard = document.createElement("div");
    playerBoard.classList.add("board");
    const computerBoard = document.createElement("div");
    computerBoard.classList.add("board", "computer");

    renderPlayerBoard(playerBoard);
    renderComputerBoard(computerBoard);
    document.body.append(playerBoard, computerBoard);
  };

  // function for rendering the player's board using a given div
  const renderPlayerBoard = (playerBoardDiv) => {
    const cells = player1.getCells();
    for (let cell of cells) {
      // if the cell is null, append a div.empty to playerBoardDiv
      if (cell === null) {
        const div = document.createElement("div");
        div.classList.add("empty");
        playerBoardDiv.append(div);
      }
      // else, append a div.ship
      else {
        const div = document.createElement("div");
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
        compPlayer.attack(cell.coordinate);
        updateComputerBoard(div, cell.coordinate);
      };
      computerBoardDiv.append(div);
    });
  };

  // updates the computers board div
  const updateComputerBoard = (div, coordinate) => {
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
  };
  return { displayBoards };
}

export { RenderGame };
