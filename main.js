// Calculator Functionality
const buttonsEl = document.querySelectorAll(".buttons button");
const inputFieldEl = document.getElementById("result");

for (let i = 0; i < buttonsEl.length; i++) {
  buttonsEl[i].addEventListener("click", () => {
    const buttonValue = buttonsEl[i].textContent;
    if (buttonValue === "C") {
      clearResult();
    } else if (buttonValue === "=") {
      calculateResult();
    } else {
      appendValue(buttonValue);
    }
  });
}

function clearResult() {
  inputFieldEl.value = "";
}

function calculateResult() {
  try {
    inputFieldEl.value = eval(inputFieldEl.value);
  } catch {
    inputFieldEl.value = "Error";
  }
}

function appendValue(buttonValue) {
  inputFieldEl.value += buttonValue;
}

// Toggle Between Calculator and Converter
const toggleConverter = document.getElementById("toggleConverter");
const toggleCalculator = document.getElementById("toggleCalculator");
const calculatorEl = document.querySelector(".calculator");
const converterEl = document.getElementById("converter");

toggleConverter.addEventListener("click", () => {
  calculatorEl.style.display = "none";
  converterEl.style.display = "block";
});

toggleCalculator.addEventListener("click", () => {
  converterEl.style.display = "none";
  calculatorEl.style.display = "block";
});

// Currency Converter Functionality
const currency1El = document.getElementById("currency1");
const currency2El = document.getElementById("currency2");
const swapBtn = document.getElementById("swap");

swapBtn.addEventListener("click", () => {
  const temp = currency1El.value;
  currency1El.value = currency2El.value;
  currency2El.value = temp;

  // Recalculate the conversion after swap
  convertCurrency();
});

document.getElementById("amount").addEventListener("input", convertCurrency);
currency1El.addEventListener("change", convertCurrency);
currency2El.addEventListener("change", convertCurrency);

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = currency1El.value;
  const toCurrency = currency2El.value;

  if (amount === "") return;

  // Fetch the exchange rates
  fetch(
    `https://v6.exchangerate-api.com/v6/876d9f2b29581a92870d4ae7/latest/${fromCurrency}`
  )
    .then((response) => response.json())
    .then((data) => {
      const rate = data.conversion_rates[toCurrency];
      document.getElementById("convertedResult").value = (
        amount * rate
      ).toFixed(2);
    })
    .catch((error) => {
      console.error("Error fetching exchange rate:", error);
      document.getElementById("convertedResult").value = "Error";
    });
}
