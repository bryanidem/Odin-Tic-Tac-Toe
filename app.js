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

    cells.forEach((cell) => {
        cell.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            console.log(currentPlayer);
            handleCellClick(index, event.target);
            playTurn(index);
        });
    });

    const handleCellClick = (index, cellElement) => {
        console.log(index, cellElement);
        cellElement.textContent = currentPlayer.marker;
    };

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
        return winnerCombinations.some((combination) =>
            combination.every(
                (index) =>
                    gameboard.getGameboard()[index] === currentPlayer.marker
            )
        );
    };

    const displayResult = (message) => {
        const result = document.querySelector(".result");
        result.textContent = message;
    };

    const playTurn = (index) => {
        if (gameIsOver) {
            displayResult("Want to play another game?");
            return;
        } else {
            console.log(`Is ${currentPlayer.name}'s turn`);

            if (gameboard.placeMarker(index, currentPlayer)) {
                if (checkWinner()) {
                    console.log(
                        `Congratulations! ${currentPlayer.name} has won!`
                    );
                    displayResult(`Congratulations ${currentPlayer.name} won!`);
                    gameIsOver = true;
                    return;
                }

                if (gameboard.isGameboardFull()) {
                    console.log("It's a draw");
                    gameIsOver = true;
                    displayResult("It's a tie!");
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

    return { playTurn, displayResult };
};

const player1 = Player("Bryan", "X");
const player2 = Player("Computer", "O");
const game = Game(player1, player2);
game.displayResult(`${player1.name}'s Turn [${player1.marker}]`);
