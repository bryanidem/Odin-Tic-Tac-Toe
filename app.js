const Gameboard = () => {
    const gameboard = ["", "", "", "", "", "", "", "", ""];

    const placeMarker = (index, player) => {
        if (gameboard[index] === "") {
            gameboard[index] = player.marker;
            return true;
        } else {
            return false;
        }
    };
    const getGameboard = () => gameboard;
    const displayGameboard = () => console.log(gameboard);
    const isGameboardFull = () =>
        gameboard.filter((cell) => cell === "").length === 0;

    return { getGameboard, placeMarker, displayGameboard, isGameboardFull };
};

const Player = (name, marker) => {
    return { name, marker };
};

const Game = (player1, player2) => {
    const gameboard = Gameboard();
    let currentPlayer = player1;
    let gameIsOver = false;
    const cells = document.querySelectorAll(".cell");

    const disableCellClick = () => {
        cells.forEach((cell) => {
            cell.removeEventListener("click", handleCellClick);
        });
    };

    const handleCellClick = (event) => {
        const index = event.target.getAttribute("data-index");
        playTurn(index, event.target);
    };

    cells.forEach((cell) => {
        cell.addEventListener("click", handleCellClick);
    });

    const checkWinner = () => {
        const winnerCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const combination of winnerCombinations) {
            if (
                combination.every(
                    (index) =>
                        gameboard.getGameboard()[index] === currentPlayer.marker
                )
            ) {
                return combination;
            }
        }
        return null;
    };

    const displayResult = (message) => {
        const result = document.querySelector(".result");
        result.textContent = message;
    };

    const playTurn = (index, cellElement) => {
        if (gameIsOver) {
            displayResult("Want to play another game?");
            disableCellClick();
            return;
        } else {
            console.log(`Is ${currentPlayer.name}'s turn`);

            if (gameboard.placeMarker(index, currentPlayer)) {
                cellElement.textContent = currentPlayer.marker;
                const winningCombination = checkWinner();
                if (winningCombination) {
                    displayResult(`Congratulations ${currentPlayer.name} won!`);
                    gameIsOver = true;
                    disableCellClick();
                    highlightWinner(winningCombination);
                    return;
                }

                if (gameboard.isGameboardFull()) {
                    console.log("It's a draw");
                    gameIsOver = true;
                    displayResult("It's a tie!");
                    disableCellClick();
                    return;
                }
                gameboard.displayGameboard();
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                game.displayResult(
                    `${currentPlayer.name}'s Turn [${currentPlayer.marker}]`
                );
            } else {
                console.log("Bad move, choose another index");
                displayResult("Cell has already a value");
            }
        }
    };

    const highlightWinner = (combination) => {
        combination.forEach((index) => {
            const cell = document.querySelector(`[data-index="${index}"]`);
            cell.classList.add("winnerCell");
        });
    };

    return { playTurn, displayResult };
};

const player1 = Player("Bryan", "X");
const player2 = Player("Computer", "O");
const game = Game(player1, player2);
game.displayResult(`${player1.name}'s Turn [${player1.marker}]`);
