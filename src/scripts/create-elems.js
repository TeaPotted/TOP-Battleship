// returns a div with a class of "container"
function createDiv(...cls) {
  const div = document.createElement("div");
  div.classList.add(...cls);
  return div;
}

function createBtn(text, cls) {
  const btn = document.createElement("button");
  btn.classList.add(cls);
  btn.textContent = text;
  return btn;
}

export { createDiv, createBtn };
