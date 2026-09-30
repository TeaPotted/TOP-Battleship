import { Player } from "./player.js";

function RenderGame() {
  const player1 = Player();
  const compPlayer = Player();

  // function for displaying both the player's and computer's board on the DOM
  const displayBoards = () => {
    const playerBoard = document.createElement("div");
    playerBoard.classList.add("board");
    const computerBoard = document.createElement("div");
    computerBoard.classList.add("board");

    renderPlayerBoard(player1, playerBoard);
    renderComputerBoard(compPlayer, computerBoard);
    document.body.append(playerBoard, computerBoard);
  };

  // function for rendering the player's board using a given div
  const renderPlayerBoard = (player, playerBoardDiv) => {
    const cells = player.getCells();
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
  const renderComputerBoard = (computer, computerBoardDiv) => {
    computer.getCells().forEach(() => {
      const div = document.createElement("div");
      div.classList.add("empty");
      computerBoardDiv.append(div);
    });
  };

  return { displayBoards };
}

export { RenderGame };
