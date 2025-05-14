document.addEventListener("DOMContentLoaded", () => {
    new TicTacToe();
});

class TicTacToe {
    constructor() {
        this.matrix = [];
        this.size = 3;
        this.player = 1;
        this.init();
    }

    init() {
        this.renderHistory();
        this.createSettingsPanel();
        this.setupSizeSelection();
    }

    createSettingsPanel() {
        const panel = document.createElement("div");
        panel.className = "choice";

        const label = document.createElement("label");
        label.htmlFor = "limit";
        label.textContent = "Size for the board (odd number between 3-19):";

        const input = document.createElement("input");
        input.type = "number";
        input.min = "3";
        input.max = "19";
        input.step = "2";
        input.id = "limit";
        input.placeholder = "Size";

        const button = document.createElement("button");
        button.textContent = "Start Game";

        panel.append(label, input, button);
        document.body.appendChild(panel);
    }

    setupSizeSelection() {
        document
            .querySelector(".choice button")
            .addEventListener("click", () => {
                const input = document.querySelector(".choice input");
                const parsedSize = parseInt(input.value, 10);

                if (!isNaN(parsedSize)) {
                    if (
                        parsedSize >= 3 &&
                        parsedSize <= 19 &&
                        parsedSize % 2 === 1
                    ) {
                        this.size = parsedSize;
                    } else {
                        this.addToHistory("Invalid size! Using default 3.", 0);
                    }
                } else if (input.value.trim() === "") {
                    this.addToHistory("Empty input! Using default 3.", 0);
                }

                this.initializeGame();
                document.querySelector(".choice").remove();
            });
    }

    initializeGame() {
        this.initializeBoard();
        this.renderGameBoard();
        this.setupGameListeners();
    }

    initializeBoard() {
        this.matrix = Array.from({ length: this.size }, () =>
            Array(this.size).fill(0)
        );
    }

    renderGameBoard() {
        const board = document.createElement("div");
        board.className = "board";

        this.matrix.forEach((row, y) => {
            const rowDiv = document.createElement("div");
            rowDiv.className = "row";

            row.forEach((_, x) => {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.dataset.coords = `${y},${x}`;
                cell.dataset.value = `0`;
                cell.style.width =
                    cell.style.height = `calc(50vh / ${this.size})`;
                rowDiv.appendChild(cell);
            });

            board.appendChild(rowDiv);
        });

        document.body.appendChild(board);

        document.querySelector(".history").classList.remove("hidden");
    }

    setupGameListeners() {
        document.querySelector(".board").addEventListener("click", (e) => {
            const cell = e.target.closest(".cell");
            if (!cell || cell.dataset.value !== "0") return;

            const [y, x] = cell.dataset.coords.split(",").map(Number);
            this.makeMove(cell, y, x);
        });
    }

    makeMove(cell, y, x) {
        cell.dataset.value = this.player;
        this.matrix[y][x] = this.player;
        this.addToHistory(
            `Player ${this.player} choose [${x+1},${y+1}]`,
            this.player
        );

        if (this.checkGameResult()) {
            this.handleGameEnd();
            document
                .querySelectorAll('.cell[data-value="0"]')
                .forEach((cell) => {
                    cell.dataset.value = 3;
                });
            return;
        }

        this.player = this.player === 1 ? 2 : 1;
    }

    checkGameResult() {
        return this.checkWin() || this.checkTie();
    }

    checkWin() {
        return this.checkRows() || this.checkColumns() || this.checkDiagonals();
    }

    checkRows() {
        return this.matrix.some(
            (row) => row[0] !== 0 && row.every((cell) => cell === row[0])
        );
    }

    checkColumns() {
        return Array.from({ length: this.size }).some((_, col) => {
            const column = this.matrix.map((row) => row[col]);
            return (
                column[0] !== 0 && column.every((cell) => cell === column[0])
            );
        });
    }

    checkDiagonals() {
        const diag1 = this.matrix.map((row, i) => row[i]);
        const diag2 = this.matrix.map((row, i) => row[this.size - 1 - i]);

        return [diag1, diag2].some(
            (diag) => diag[0] !== 0 && diag.every((cell) => cell === diag[0])
        );
    }

    checkTie() {
        return this.matrix.every((row) => row.every((cell) => cell !== 0));
    }

    handleGameEnd() {
        const message = this.checkWin()
            ? `Player ${this.player} wins!`
            : "It's a tie!";

        this.addToHistory(message, 0);
    }

    renderHistory() {
        const history = document.createElement("div");
        history.className = "history hidden";
        document.body.appendChild(history);
    }

    addToHistory(message, player) {
        const entry = document.createElement("div");
        entry.innerText = message;
        entry.classList.add(`player${player}`);
        const history = document.querySelector(".history");
        history.appendChild(entry);
        history.scrollTop = history.scrollHeight;
    }
}
