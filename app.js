const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  const addToken = (player, position) => {
    if (gameboard[position] === "") {
      gameboard[position] = player;
    }
  };
  return { gameboard, addToken };
})();

const Player = (name, indicator) => {
  return { name, indicator };
};

const Game = () => {
  const bryan = Player("Bryan", "X");
  const jime = Player("Jime", "O");

  Gameboard.addToken(bryan, 3);
  Gameboard.addToken(jime, 5);

  console.log(Gameboard.gameboard);
};

Game();
