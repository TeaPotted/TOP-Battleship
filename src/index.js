import "./styles.css";
import { RenderGame } from "./scripts/module.js";

const playBtn = document.querySelector(".titleScreen-container .playBtn");
const r = RenderGame();

playBtn.addEventListener("click", () => {
  document.querySelector(".titleScreen-container").style.display = "none";
  r.displayStartScreen();
});
