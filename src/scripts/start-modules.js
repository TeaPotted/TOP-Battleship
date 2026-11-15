import { createDiv, createBtn } from "./create-elems.js";

let dragged;
let draggedDiv;

const createShip = (len, dir) => {
  const shipDiv = createDiv("ship");
  shipDiv.dataset.length = len;
  shipDiv.dataset.direction = dir;
  shipDiv.draggable = true;
  if (dir === "v") {
    shipDiv.style.height = `${len}0%`;
    shipDiv.style.width = "10%";
  } else {
    shipDiv.style.width = `${len}0%`;
    shipDiv.style.height = "10%";
  }

  for (let i = 0; i < len; i++) {
    const subDiv = createDiv();
    shipDiv.append(subDiv);

    if (dir === "v") {
      subDiv.style.height = `${100 / len}%`;
    } else {
      subDiv.style.width = `${100 / len}%`;
    }

    subDiv.dataset.number = i;
    subDiv.addEventListener("mouseover", () => {
      draggedDiv = subDiv;
    });
  }

  shipDiv.addEventListener("dragstart", (event) => {
    dragged = event.target;
  });

  return shipDiv;
};

// function for rendering the player's board using a given div
const renderPlayerBoard = (player, playerBoardDiv) => {
  const cells = player.getCells();
  for (let cell of cells) {
    const div = createDiv();
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

    div.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    div.addEventListener("drop", (e) => {
      e.preventDefault();
      dragAndDropShip(player, playerBoardDiv, cell, e);
    });
  }
};

// moves the dragged ship div onto the given cell in the player's board
function dragAndDropShip(player, playerBoardDiv, cell, e) {
  if (e.target.classList.contains("empty")) {
    const length = dragged.dataset.length;
    const direction = dragged.dataset.direction;
    let [row, col] = cell.coordinate;

    // calculate the actual row and col values by deducting them by the dragged ship's div data-number value
    if (direction === "v") {
      row = row - draggedDiv.dataset.number;
    } else {
      col = col - draggedDiv.dataset.number;
    }

    if (player.placeShipIsPossible(row, col, length, direction) === false) {
      return;
    }
    // if .startScreen contains p.error, remove it
    const startScreenContainer = document.querySelector(
      ".startScreen-container",
    );
    if (startScreenContainer.querySelector("p.error")) {
      startScreenContainer.removeChild(
        startScreenContainer.querySelector("p.error"),
      );
    }

    player.placeShip(Number(length), direction, row, col);
    playerBoardDiv.textContent = "";
    renderPlayerBoard(player, playerBoardDiv);
    dragged.parentNode.removeChild(dragged); // remove the dragged ship from .ships-container
  }
}

// displays the container for keeping the placeable ships
const displayShips = () => {
  const container = createDiv("ships-container");

  const verticalShips = createDiv("vertical-container");
  verticalShips.append(
    createShip(1, "v"),
    createShip(2, "v"),
    createShip(3, "v"),
    createShip(4, "v"),
    createShip(5, "v"),
  );

  const horizontalShips = createDiv("horizontal-container");
  horizontalShips.append(
    createShip(1, "h"),
    createShip(2, "h"),
    createShip(3, "h"),
    createShip(4, "h"),
    createShip(5, "h"),
  );

  // div for change ship button and paragraph
  const changeShipTypeDiv = createDiv("changeShip-container");

  // button that switches displaying either horizontal or vertical ships
  const changeShipType = createBtn("VERTICAL", "vertical");

  const p = document.createElement("p");
  p.textContent = "click to display different directions";

  changeShipTypeDiv.append(changeShipType, p);
  changeShipType.addEventListener("click", () => {
    // if the current displayed ships are vertical, switch to the horizontal ships
    if (changeShipType.textContent === "VERTICAL") {
      changeShipType.textContent = "HORIZONTAL";
      verticalShips.style.display = "none";
      horizontalShips.style.display = "block";
    } else {
      // else, display the vertical ships
      changeShipType.textContent = "VERTICAL";
      horizontalShips.style.display = "none";
      verticalShips.style.display = "flex";
    }
  });

  container.append(verticalShips, horizontalShips, changeShipTypeDiv);
  return container;
};

export { displayShips, renderPlayerBoard };
