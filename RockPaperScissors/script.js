var scoreboard = [0, 0, 0];
const values = ["rock", "paper", "scissors"];
const timer = 2000;

document.addEventListener("DOMContentLoaded", function () {
    initBoard();
});

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

function initBoard() {
    const board = document.createElement("div");
    board.classList = "board";
    for (let i = 0; i < 5; i++) {
        const row = document.createElement("div");
        row.classList = "row";

        const cards = document.createElement("div");
        cards.classList = "cards";
        row.appendChild(cards);

        switch (i) {
            case 0:
                values.forEach((value) => {
                    cards.appendChild(createCard(value, "back"));
                });
                break;
            case 1:
                cards.appendChild(createCard("", "empty"));
                break;
            case 2:
                createScoreBoard(cards);
                break;
            case 3:
                cards.appendChild(createCard("", "empty"));
                break;
            case 4:
                values.forEach((value) => {
                    cards.appendChild(createCard(value, "front"));
                });
                break;
            default:
                break;
        }

        board.appendChild(row);
    }
    document.body.appendChild(board);
}

function createCard(value, type) {
    const card = document.createElement("div");
    card.classList = `card ${type}`;
    card.setAttribute("value", value);

    switch (type) {
        case "front":
            card.setAttribute("draggable", true);
            card.addEventListener("dragstart", dragStartHandler);
            break;
        case "empty":
            card.addEventListener("drop", dropHandler);
            card.addEventListener("dragover", dragOverHandler);
            break;
        default:
            break;
    }
    return card;
}

function dragStartHandler(event) {
    event.dataTransfer.setData("text", event.target.getAttribute("value"));
}

function dragOverHandler(event) {
    event.preventDefault();
}

function dropHandler(event) {
    event.preventDefault();
    const card = document.querySelector(
        `.board .row:nth-child(5) .card[value="${event.dataTransfer.getData(
            "text"
        )}"]`
    );
    const parent = card.parentElement;
    event.target.appendChild(card);
    play(card.getAttribute("value"));

    setTimeout(function () {
        parent.appendChild(card);
    }, timer);
}

function createScoreBoard(root) {
    const win = document.createElement("div");
    win.id = "win";
    win.innerHTML = scoreboard[0];
    root.appendChild(win);
    root.appendChild(document.createElement("hr"));
    const draw = document.createElement("div");
    draw.id = "draw";
    draw.innerHTML = scoreboard[1];
    root.appendChild(draw);
    root.appendChild(document.createElement("hr"));
    const loss = document.createElement("div");
    loss.id = "loss";
    loss.innerHTML = scoreboard[2];
    root.appendChild(loss);
}

function play(player) {
    let rand = parseInt(Math.random() * 3);
    const computerCards = Array.from(
        document.querySelectorAll(".board .row:first-child .card")
    );
    let computer = computerCards[rand].getAttribute("value");
    showComputerCard(computer);

    if (compare(player, computer) === 1) {
        scoreboard[0]++;
    } else if (compare(player, computer) === 0) {
        scoreboard[1]++;
    } else if (compare(player, computer) === -1) {
        scoreboard[2]++;
    }
    reloadScoreboard();
}

function showComputerCard(value) {
    let computerCard = document.querySelector(
        `.board .row:first-child .card[value='${value}']`
    );
    computerCard.classList.remove("back");
    computerCard.classList.add("front");
    let parent = computerCard.parentElement;
    let dropzone = document.querySelector(".board .row:nth-child(2) .card");
    dropzone.appendChild(computerCard);

    setTimeout(function () {
        computerCard.classList.add("back");
        computerCard.classList.remove("front");
        parent.appendChild(computerCard);
    }, timer);
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
