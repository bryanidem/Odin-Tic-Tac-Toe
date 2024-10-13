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

  return { getGameboard, placeMarker, displayGameboard };
};

const Player = (name, marker) => {
  return { name, marker };
};

const Game = (player1, player2) => {
  const gameboard = Gameboard();
  gameboard.placeMarker(2, player1);
  gameboard.placeMarker(4, player1);
  gameboard.placeMarker(6, player1);

  const checkWinner = (marker) => {
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
      combination.every((index) => gameboard.getGameboard()[index] === marker)
    );
  };

  return { checkWinner };
};

const playGame = () => {
  const game = Game();
};

console.log(Game().checkWinner("X"));
