const createInputContainer = (inputId, labelText, inputType) => {
  const container = document.createElement("div");
  container.classList.add("input-container");

  const label = document.createElement("label");
  label.setAttribute("for", inputId);
  label.textContent = labelText;
  const input = document.createElement("input");
  input.id = inputId;
  input.type = inputType;

  container.append(label, input);
  return container;
};

// creates the div for the select#direction input
const createDirectionContainer = () => {
  const container = document.createElement("div");
  container.classList.add("input-container");

  const label = document.createElement("label");
  label.setAttribute("for", "direction");
  label.textContent = "Direction:";

  const select = document.createElement("select");
  select.id = "direction";
  const option1 = document.createElement("option");
  option1.value = "h";
  option1.textContent = "Horizontal";

  const option2 = document.createElement("option");
  option2.value = "v";
  option2.textContent = "Vertical";

  select.append(option1, option2);
  container.append(label, select);
  return container;
};

const createButton = (text) => {
  const button = document.createElement("button");
  button.textContent = text;
  return button;
};

export { createInputContainer, createDirectionContainer, createButton };
