const UInumber = document.querySelectorAll("[data-number]");
const UIpreviousInput = document.querySelector("[data-previous-operand]");
const UIcurrentInput = document.querySelector("[data-current-operand]");
const UIdelete = document.querySelector("[data-delete]");
const UIoperation = document.querySelectorAll("[data-operation]");
const UIreset = document.querySelector("[data-reset]");
const UIequals = document.querySelector("[data-equals]");
const UIcalculator = document.querySelector(".calculator-buttons");

let currentDigit = "",
  previousDigit = "",
  operand = undefined;
UIcurrentInput.textContent = "0";

UInumber.forEach((button) => {
  button.addEventListener("mousedown", (e) => {
    appendNumber(button.textContent);
    UIcurrentInput.textContent += button.textContent;
    upDateDisplay();

    e.preventDefault();
  });
});

function appendNumber(digit) {
  if (digit === "." && currentDigit.includes(".")) {
    return;
  }
  currentDigit += digit;
}

function getDisplay(currentDigit) {
  const numberString = parseFloat(currentDigit.split(".")[0]),
        decimalString = currentDigit.split(".")[1];
  let integerDisplay;


  if (isNaN(numberString)) {
    integerDisplay = "";
  } else {
    integerDisplay = numberString.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }

  if (decimalString != null) {
    return `${integerDisplay}.${decimalString}`;
  } else {
    return `${integerDisplay}`;
  }
}

const upDateDisplay = () => {
  UIcurrentInput.textContent = getDisplay(currentDigit);
};

UIreset.onclick = () => {
  (currentDigit = ""), (previousDigit = "");
  UIcurrentInput.textContent = "0";
  UIpreviousInput.textContent = "";
};

UIdelete.onclick = () => {
  lastFigure = currentDigit.length - 1;
  currentDigit = currentDigit.slice(0, lastFigure);

  upDateDisplay();
};

UIoperation.forEach((operation) => {
  operation.onclick = () => {
    chooseOperation(operation.textContent);
  };
});

const chooseOperation = (operation) => {
  if (currentDigit === "") {
    return;
  }

  if (previousDigit != null) {
    compute();
  }

  operand = operation;
  previousDigit = currentDigit;
  UIpreviousInput.textContent = previousDigit + " " + operand;
  currentDigit = " ";
  upDateDisplay();
};

const compute = () => {
  let computation,
    prev = parseFloat(previousDigit),
    current = parseFloat(currentDigit);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operand) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;

    default:
      return;
  }

  currentDigit = computation.toString();
  operand = undefined;
  previousDigit = " ";
};

UIequals.addEventListener("click", display);

function display(e) {
  compute();
  upDateDisplay();
  UIpreviousInput.textContent = previousDigit;
  e.preventDefault();
}
// done