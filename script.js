let A = null;
let B = null;
let operator = null;

const buttonValues = [
  "⌫", "AC", "%", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "+/-", "0", ".", "="
];

const topSymbols = ["⌫", "AC", "%"];
const rightSymbols = ["/", "*", "-", "+", "="];

const display = document.getElementById("display");
buttonValues.forEach(value => {
  const button = document.createElement("button");
  button.innerText = value;
  button.classList.add("calc-btn");

  if (rightSymbols.includes(value)) {
    button.style.backgroundColor = "#FF9500";
    button.style.color = "#ffffff";
  } else if (topSymbols.includes(value)) {
    button.style.backgroundColor = "#D4D4D4";
    button.style.color = "#1C1C1C";
  } else {
    button.style.backgroundColor = "#333333";
    button.style.color = "#ffffff";
  }

  document.getElementById("buttons").appendChild(button);

  button.addEventListener("click", function() {
    
    if (value === "⌫") {
      display.value = display.value.slice(0, -1);
      if (display.value === "") {
        display.value = "0";
      }
      return;
    }

    if (value === "AC") {
      A = null;
      B = null;
      operator = null;
      display.value = "0";
      return;
    }

    if (value === "+/-") {
      if (display.value !== "0" && display.value !== "") {
        display.value = String(Number(display.value) * -1);
      }
      return;
    }

    if (value === "%") {
      if (display.value !== "") {
        display.value = String(Number(display.value) / 100);
      }
      return;
    }

    if (value === "=") {
      if (operator !== null && display.value !== "") {
        B = Number(display.value);
        let result = 0;

        if (operator === "+") result = A + B;
        else if (operator === "-") result = A - B;
        else if (operator === "*") result = A * B;
        else if (operator === "/") {
          if (B === 0) {
            display.value = "Error";
            A = null; B = null; operator = null;
            return;
          }
          result = A / B;
        }

        display.value = String(result);
        A = result;
        operator = null;
        B = null;
      }
      return;
    }

    if (rightSymbols.includes(value) && value !== "=") {
      if (display.value !== "") {
        A = Number(display.value);
        operator = value;
        display.value = "0";
      }
      return;
    }

    if (value === ".") {
      if (!display.value.includes(".")) {
        if (display.value === "" || display.value === "0") {
          display.value = "0.";
        } else {
          display.value += ".";
        }
      }
      return;
    }

    if (display.value === "0") {
      display.value = value;
    } else {
      display.value += value;
    }
  });
});