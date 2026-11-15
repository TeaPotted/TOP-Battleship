import { createDiv, createBtn } from "./create-elems.js";

function getPlayAgainBtn(resetGame, displayStartScreen) {
  const button = createBtn("PLAY AGAIN");

  button.addEventListener("click", () => {
    resetGame();
    document.querySelector(".end-container").remove();
    displayStartScreen();
  });

  return button;
}

// displays the winning screen
function displayWinScreen(resetGame, displayStartScreen) {
  const container = createDiv("end-container");
  const winContainer = createDiv("win-container");
  const text = document.createElement("p");
  text.classList.add("text");
  text.textContent = "YOU WIN!";

  const emoji = document.createElement("span");
  emoji.textContent = "🏆";

  winContainer.append(
    text,
    emoji,
    getPlayAgainBtn(resetGame, displayStartScreen),
  );
  container.append(winContainer);
  document.body.append(container);
}

// displays the losing screen
function displayLoseScreen(resetGame, displayStartScreen) {
  const container = createDiv("end-container");
  const loseContainer = createDiv("lose-container");

  const text = document.createElement("p");
  text.classList.add("text");
  text.textContent = "YOU LOSE!";

  const emoji = document.createElement("span");
  emoji.textContent = "🏳️";

  loseContainer.append(
    text,
    emoji,
    getPlayAgainBtn(resetGame, displayStartScreen),
  );
  container.append(loseContainer);
  document.body.append(container);
}

export { displayWinScreen, displayLoseScreen };
