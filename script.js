const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerText = "";
    } else if (item.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
    } else if (display.innerText != "" && item.id == "equal") {
      try {
        let result = eval(display.innerText);
        history.unshift(`${display.innerText} = ${result}`); // Add to history
        updateHistory();
        display.innerText = result;
        setTimeout(() => (display.innerText = ""), 2000); // Auto-clear after 2 seconds
      } catch {
        display.innerText = "Error";
        setTimeout(() => (display.innerText = ""), 2000); // Auto-clear after 2 seconds
      }
    } else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "Empty!";
      setTimeout(() => (display.innerText = ""), 2000);
    } else if (item.id == "history-btn") {
      //ignore
    } else {
      display.innerText += item.id;
    }
  };
});

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};

//Author: Abraham Moruri(github.com/abraham-ny)
const historyList = document.getElementById("history-list");
const historyBtn = document.getElementById("history-btn");
let history = [];
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    display.innerText += key;
  } else if (["+", "-", "*", "/"].includes(key)) {
    display.innerText += key;
  } else if (key === "Enter") {
    event.preventDefault();
    try {
      let result = eval(display.innerText);
      history.unshift(`${display.innerText} = ${result}`); // Add to history
      updateHistory();
      display.innerText = result;
      setTimeout(() => (display.innerText = ""), 2000); // Auto-clear after 2 seconds
    } catch {
      display.innerText = "Error";
      setTimeout(() => (display.innerText = ""), 2000); // Auto-clear after 2 seconds
    }
  } else if (key === "Backspace") {
    display.innerText = display.innerText.slice(0, -1);
  } else if (key === "Escape") {
    display.innerText = "";
  }
});

function updateHistory() {
  historyList.innerHTML = "";
  history.slice(0, 10).forEach(entry => {
    let div = document.createElement("div");
    div.textContent = entry;
    console.log(entry);
    div.onclick = () => (display.innerText = entry.split(" = ")[1]);
    historyList.appendChild(div);
  });
}

historyBtn.addEventListener("click", () => {
  historyList.classList.toggle("hidden");
});
