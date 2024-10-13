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

    const playTurn = (index) => {
        if (gameIsOver) {
            console.log("Game is over!");
            //Add a function to restart
            return;
        } else {
            console.log(`Is ${currentPlayer.name}'s turn`);
            if (gameboard.placeMarker(index, currentPlayer)) {
                if (checkWinner()) {
                    console.log(
                        `Congratulations! ${currentPlayer.name} has won!`
                    );
                    gameIsOver = true;
                    return;
                }

                if (gameboard.isGameboardFull()) {
                    console.log("It's a draw");
                    gameIsOver = true;
                    return;
                }
                gameboard.displayGameboard();
                currentPlayer = currentPlayer === player1 ? player2 : player1;
            } else {
                console.log("Bad move, choose another index");
            }
        }
    };

    return { playTurn };
};

const playGame = () => {
    const player1 = Player("Bryan", "X");
    const player2 = Player("Computer", "O");
    const game = Game(player1, player2);
    game.playTurn(0);
    game.playTurn(1);
    game.playTurn(2);
    game.playTurn(3);
    game.playTurn(4);
    game.playTurn(5);
    game.playTurn(6);
    game.playTurn(7);
    game.playTurn(8);
    game.playTurn(8);
};

playGame();
