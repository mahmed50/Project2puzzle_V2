let tiles = [];
let emptyX = 3;
let emptyY = 3;
const size = 4;

window.onload = function () {
  init();
  document.getElementById("shufflebutton").onclick = shuffle;
  document.getElementById("background-select").onchange = changeBackground;
};

function init() {
  const puzzlearea = document.getElementById("puzzlearea");
  puzzlearea.innerHTML = "";
  tiles = [];
  for (let i = 0; i < size * size - 1; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerText = i + 1;
    tile.style.left = `${(i % size) * 100}px`;
    tile.style.top = `${Math.floor(i / size) * 100}px`;
    tile.style.backgroundPosition = `-${(i % size) * 100}px -${Math.floor(i / size) * 100}px`;
    tile.x = i % size;
    tile.y = Math.floor(i / size);
    tile.addEventListener("click", tileClick);
    tile.addEventListener("mouseover", highlightMovable);
    tile.addEventListener("mouseout", resetStyle);
    puzzlearea.appendChild(tile);
    tiles.push(tile);
  }
  emptyX = 3;
  emptyY = 3;
  updateMovableTiles();
}

function tileClick(e) {
  const tile = e.target;
  if (isMovable(tile)) {
    moveTile(tile);
    if (checkWin()) {
      document.getElementById("status").innerText = "🎉 Puzzle Solved! Great Job! 🎉";
    }
  }
}

function moveTile(tile) {
  const dx = tile.x - emptyX;
  const dy = tile.y - emptyY;
  tile.style.left = `${emptyX * 100}px`;
  tile.style.top = `${emptyY * 100}px`;
  const tempX = tile.x;
  const tempY = tile.y;
  tile.x = emptyX;
  tile.y = emptyY;
  emptyX = tempX;
  emptyY = tempY;
  updateMovableTiles();
}

function isMovable(tile) {
  return (
    (tile.x === emptyX && Math.abs(tile.y - emptyY) === 1) ||
    (tile.y === emptyY && Math.abs(tile.x - emptyX) === 1)
  );
}

function highlightMovable(e) {
  if (isMovable(e.target)) {
    e.target.classList.add("movablepiece");
  }
}

function resetStyle(e) {
  e.target.classList.remove("movablepiece");
}

function updateMovableTiles() {
  tiles.forEach(tile => tile.classList.remove("movablepiece"));
}

function shuffle() {
  for (let i = 0; i < 300; i++) {
    let neighbors = tiles.filter(t => isMovable(t));
    if (neighbors.length > 0) {
      const randomTile = neighbors[Math.floor(Math.random() * neighbors.length)];
      moveTile(randomTile);
    }
  }
  document.getElementById("status").innerText = "";
}

function checkWin() {
  for (let i = 0; i < tiles.length; i++) {
    const correctX = i % size;
    const correctY = Math.floor(i / size);
    if (tiles[i].x !== correctX || tiles[i].y !== correctY) return false;
  }
  return true;
}

function changeBackground(e) {
  const newBg = e.target.value;
  tiles.forEach(tile => {
    tile.style.backgroundImage = `url(${newBg})`;
  });
}
