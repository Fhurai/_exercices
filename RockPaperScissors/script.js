var scoreboard = [0, 0, 0];

document.addEventListener("DOMContentLoaded", function () {
    initBoard();
    play();
});

function initBoard() {
    const board = document.createElement("div");
    board.classList = "board";

    board.innerHTML +=
        '<div class="row">' +
        genSelectString("computerPoss", "", true) +
        "</div>";
    board.innerHTML += '<div class="row choice" id="computerChoice"></div>';
    board.innerHTML += `<div class="row"><span id="win">${scoreboard[0]}</span>/<span id="draw">${scoreboard[1]}</span>/<span id="loss">${scoreboard[2]}</span></div>`;
    board.innerHTML += '<div class="row choice" id="playerChoice"></div>';
    board.innerHTML +=
        '<div class="row">' +
        genSelectString("playerPoss", "", false) +
        "</div>";

    document.body.appendChild(board);
}

function genSelectString(id, ownClass, isDisabled) {
    return (
        `<select id="${id}" class="${ownClass}" ${
            isDisabled ? "disabled" : ""
        }>` +
        `<option></option>` +
        `<option value="rock">Rock</option>` +
        `<option value="paper">Paper</option>` +
        `<option value="scissors">Scissors</option>` +
        `</select>`
    );
}

function play() {
    document
        .querySelector("#playerPoss")
        .addEventListener("change", function () {
            let player = document.querySelector("#playerPoss").value;
            if (player !== "") {
                let rand = parseInt(Math.random() * 3 + 1);
                let select = document.querySelector("#computerPoss");
                select.selectedIndex = rand;

                let computer = select.value;

                if (compare(player, computer) === 1) {
                    scoreboard[0]++;
                } else if (compare(player, computer) === 0) {
                    scoreboard[1]++;
                } else if (compare(player, computer) === -1) {
                    scoreboard[2]++;
                }
                reloadScoreboard();
            } else {
                console.error("no choice for player!");
            }
        });
}

function compare(player, computer) {
    if (player === computer) return 0;

    const beats = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper",
    };

    return beats[player] === computer ? 1 : -1;
}

function reloadScoreboard() {
    document.querySelector("#win").innerHTML = scoreboard[0];
    document.querySelector("#draw").innerHTML = scoreboard[1];
    document.querySelector("#loss").innerHTML = scoreboard[2];
}
