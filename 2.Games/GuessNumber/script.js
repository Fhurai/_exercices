var maxNumber = 100;
var history = [];
var guessNumber = 50;
var limit = [0, maxNumber];
var count = 0;

document.addEventListener("DOMContentLoaded", function () {
    renderHistory();
    startScreen();
    initBoard();
});

function startScreen() {
    const panel = document.createElement("div");
    panel.classList = "panel";
    panel.innerHTML = `
        <label for="maxNumber">Max value to guess :</label>
        <input id="maxNumber" min="1" type="number" placeholder="Max number to guess" />
        <button id="enterButton">Enter</button>`;
    document.body.appendChild(panel);

    handleEnterKey("#maxNumber", "#enterButton");
    document.querySelector("#maxNumber").focus();
}

function initBoard() {
    document
        .querySelector("#enterButton")
        .addEventListener("click", function () {
            const panel = document.querySelector(".panel");
            const input = panel.querySelector("#maxNumber");
            if (input.value !== "") {
                maxNumber = parseInt(input.value);
                addToHistory("Max number is " + maxNumber);
            } else {
                addToHistory("Empty input! Using default 100.");
            }

            guessNumber = Math.round(Math.random() * maxNumber);
            limit = [0, maxNumber];

            panel.remove();
            drawScoreboard();
            initPlay();
        });
}

function initPlay() {
    const panel = document.createElement("div");
    panel.classList = "panel";
    panel.innerHTML = `
        <label for="play">Guess the number</label>
        <input id="play" type="number" min="0" placeholder="0-${maxNumber}" max="${maxNumber}" />
        <button id="playButton">Enter</button>`;
    document.body.appendChild(panel);

    document.querySelector(".history").classList.remove("hidden");
    renderScoreboard();
    playNumber();

    handleEnterKey("#play", "#playButton");
    document.querySelector("#play").focus();
}

function playNumber() {
    document.querySelector("#playButton").addEventListener("click", function () {
        const input = document.querySelector("#play");
        const enteredNumber = parseInt(input.value);
        count++;

        if (enteredNumber > guessNumber) {
            if (enteredNumber < limit[1]) limit[1] = enteredNumber;
            addToHistory(`The number is lower than ${enteredNumber}...`, "higher");
        } else if (enteredNumber < guessNumber) {
            if (enteredNumber > limit[0]) limit[0] = enteredNumber;
            addToHistory(`The number is higher than ${enteredNumber} ...`, "lower");
        } else if (enteredNumber === guessNumber) {
            addToHistory(`The right number (${guessNumber}) was found in ${count} hit${count > 1 ? "s" : ""}!`);
            input.disabled = true;
            document.querySelector("#playButton").disabled = true;
        }

        renderScoreboard();
        input.value = "";
    });
}

function handleEnterKey(inputSelector, buttonSelector) {
    const input = document.querySelector(inputSelector);
    const button = document.querySelector(buttonSelector);

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            button.click();
        }
    });
}

function renderHistory() {
    const historyDiv = document.createElement("div");
    historyDiv.className = "history hidden";
    document.body.appendChild(historyDiv);
}

function addToHistory(message, type = null) {
    const entry = document.createElement("div");
    entry.classList = type;
    entry.innerText = message;
    const history = document.querySelector(".history");
    history.appendChild(entry);
    history.scrollTop = history.scrollHeight;
}

function drawScoreboard() {
    const scoreboard = document.createElement("div");
    scoreboard.classList = "scoreboard";
    document.body.appendChild(scoreboard);
}

function renderScoreboard() {
    const scoreboard = document.querySelector(".scoreboard");
    scoreboard.innerHTML = `[<div class='lower'>${limit[0]}</div>|<div class='higher'>${limit[1]}</div>]`;
}
