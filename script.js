"use strict";

let containerModule = (function () {
  let body = document.querySelector("body");
  let bodyContainer = document.createElement("div");
  body.style.height = "100vh";
  // body.style.backgroundColor = "red";

  function createContainer() {
    body.appendChild(bodyContainer);
    bodyContainer.classList.add("container");
    bodyContainer.style.display = "grid";
    bodyContainer.style.height = "100vh";
    // bodyContainer.style.margin = "10%";
    bodyContainer.style.backgroundColor = "lightblue";
    bodyContainer.style.gridTemplateRows = "25vh 25vh 25vh";
    bodyContainer.style.gridTemplateColumns = "25vh 25vh 25vh";
    bodyContainer.style.border = "10px solid black";
    bodyContainer.style.justifyContent = "center";
    bodyContainer.style.alignContent = "center";
  }
  return {
    bodyContainer,
    createContainer,
  };
})();

containerModule.createContainer();

let BoxModule = (type, className) => {
  let box;

  function boxStyle() {
    box.style.border = "3px solid black";
    box.style.backgroundColor = "white";
    box.style.width = "100%";
    box.style.fontSize = "15vh";
    box.style.display = "flex";
    box.style.justifyContent = "center";
    box.style.alignItems = "center";
  }

  for (let i = 0; i <= 8; i++) {
    box = document.createElement(type);
    box.classList.add(className);
    box.setAttribute("id", `${i}`);
    containerModule.bodyContainer.appendChild(box);
    boxStyle();
  }

  let createGrid = () => {
    containerModule.bodyContainer.appendChild(box);
    console.log("Hello");
  };

  return { createGrid };
};

let grid = BoxModule("div", "box");
grid.createGrid();

const Player = function (number, marker, active) {
  this.number = number;
  this.marker = marker;
  this.active = active;
};

const player1 = new Player(1, "X", true);
const player2 = new Player(2, "O", false);

const gameBoard = {
  pieces: ["X", "O", "O", "O", "O", "O", "O", "O", "O"],
  player1Index: [],
  player2Index: [],
};

const gameLogic = {
  displayPieces() {
    for (let i = 0; i <= 8; i++) {
      let box = document.getElementById(`${i}`);
      box.textContent = gameBoard.pieces[i];
    }
  },

  switchPlayer() {
    player1.active == true
      ? ((player1.active = false), (player2.active = true))
      : ((player1.active = true), (player2.active = false));
  },

  clearPieces(el, index) {
    gameBoard.pieces[index] = "";
  },

  activePlayer() {
    if (player1.active == true) return player1;
    else return player2;
  },

  pushIndex() {
    gameBoard.player1Index = [];
    gameBoard.player2Index = [];
    gameBoard.pieces.filter((e, i) => {
      if (e == player1.marker) {
        gameBoard.player1Index.push(i);
      }
      if (e == player2.marker) {
        gameBoard.player2Index.push(i);
      }
    });
    gameBoard.player1Index.sort();
    gameBoard.player2Index.sort();
  },

  checkWinner() {
    const isSubset = (array1, array2) =>
      array2.every((element) => array1.includes(element));

    for (let i = 0; i < winBoxes.length; i++) {
      console.log(i);
      if (isSubset(gameBoard.player1Index, winBoxes[i])) {
        this.displayPieces();
        alert("Player 1 Wins");
        this.resetGame();
      }
      if (isSubset(gameBoard.player2Index, winBoxes[i])) {
        this.displayPieces();
        alert("Player 2 Wins");
        this.resetGame();
      }
    }
  },

  resetGame() {
    gameBoard.pieces.forEach(gameLogic.clearPieces);
  },
};

const winBoxes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

gameBoard.pieces.forEach(gameLogic.clearPieces);

containerModule.bodyContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("box")) {
    let box = event.target.id;
    let player = gameLogic.activePlayer();
    if (!gameBoard.pieces[box]) {
      gameBoard.pieces[box] = player.marker;
      gameLogic.displayPieces();
      gameLogic.pushIndex();
      gameLogic.checkWinner();
      gameLogic.switchPlayer();
      console.log(gameBoard);
    }
  }
});
