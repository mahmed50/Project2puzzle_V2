let timerInterval;
let seconds = 0;
let moves = 0;

window.onload = function () {
  const puzzleArea = document.getElementById("puzzlearea");
  const timerDisplay = document.getElementById("timer");
  const moveDisplay = document.getElementById("moveCounter");
  const winMessage = document.getElementById("winMessage");

  const tiles = [];
  let emptyX = 3;
  let emptyY = 3;

  function updateTimer() {
    seconds++;
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    timerDisplay.textContent = `${min}:${sec}`;
  }

  function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    timerInterval = setInterval(updateTimer, 1000);
  }

  function createTiles() {
    puzzleArea.innerHTML = "";
    tiles.length = 0;
    for (let i = 0; i < 15; i++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.innerText = i + 1;
      tile.style.left = `${(i % 4) * 100}px`;
      tile.style.top = `${Math.floor(i / 4) * 100}px`;
      tile.style.backgroundImage = "url('background.jpg')";
      tile.style.backgroundPosition = `-${(i % 4) * 100}px -${Math.floor(i / 4) * 100}px`;
      puzzleArea.appendChild(tile);
      tiles.push(tile);
    }
  }

  function isMovable(x, y) {
    return (Math.abs(emptyX - x) + Math.abs(emptyY - y) === 1);
  }

  function moveTile(tile, x, y, index) {
    if (isMovable(x, y)) {
      tile.style.left = `${emptyX * 100}px`;
      tile.style.top = `${emptyY * 100}px`;
      [emptyX, emptyY] = [x, y];
      moves++;
      moveDisplay.textContent = moves;
      checkWin();
    }
  }

  function highlightMovable() {
    tiles.forEach((tile, i) => {
      const x = i % 4;
      const y = Math.floor(i / 4);
      if (isMovable(x, y)) {
        tile.classList.add("movablepiece");
      } else {
        tile.classList.remove("movablepiece");
      }
    });
  }

  function shuffle() {
    for (let i = 0; i < 300; i++) {
      const neighbors = tiles.map((_, i) => i).filter(i => isMovable(i % 4, Math.floor(i / 4)));
      const rand = neighbors[Math.floor(Math.random() * neighbors.length)];
      const tile = tiles[rand];
      moveTile(tile, rand % 4, Math.floor(rand / 4), rand);
    }
    moves = 0;
    moveDisplay.textContent = moves;
    winMessage.textContent = "";
    startTimer();
  }

  function cheat() {
    tiles.forEach((tile, i) => {
      tile.style.left = `${(i % 4) * 100}px`;
      tile.style.top = `${Math.floor(i / 4) * 100}px`;
    });
    emptyX = 3;
    emptyY = 3;
    moves = 0;
    moveDisplay.textContent = moves;
    seconds = 0;
    timerDisplay.textContent = "00:00";
    winMessage.textContent = "Puzzle Solved (Cheated)";
  }

  function checkWin() {
    const won = tiles.every((tile, i) => {
      const x = parseInt(tile.style.left) / 100;
      const y = parseInt(tile.style.top) / 100;
      return x === i % 4 && y === Math.floor(i / 4);
    });
    if (won && emptyX === 3 && emptyY === 3) {
      clearInterval(timerInterval);
      winMessage.textContent = `You won! Time: ${timerDisplay.textContent}, Moves: ${moves}`;
    }
  }

  document.getElementById("shuffleButton").onclick = shuffle;
  document.getElementById("cheatButton").onclick = cheat;
  document.getElementById("backgroundSelector").onchange = function (e) {
    const bg = e.target.value;
    tiles.forEach((tile, i) => {
      tile.style.backgroundImage = `url('${bg}')`;
      tile.style.backgroundPosition = `-${(i % 4) * 100}px -${Math.floor(i / 4) * 100}px`;
    });
  };

  createTiles();
  highlightMovable();

  puzzleArea.addEventListener("mouseover", highlightMovable);
  tiles.forEach((tile, i) => {
    tile.onclick = () => moveTile(tile, i % 4, Math.floor(i / 4), i);
  });
};
