let columnSize = 6;
let rowSize = 6;
let grid = [];
let currentSum = 0;
let target;
let score = 0;

const initTarget = () => {
  target = 10 + Math.ceil(Math.random() * 60);
  document.getElementById("target").innerHTML = target;
};
const updateScore = (score) => {
  document.getElementById("score").innerHTML = "score: " + score;
};
const addCells = () => {
  let arr = [];
  for (let i = 0; i < columnSize; i++) {
    let obj = {};
    obj.value = Math.ceil(Math.random() * 9);
    obj.selected = false;
    arr.push(obj);
  }
  grid.unshift(arr);
  //console.log(grid);
};

const getId = (i, j) => {
  return i.toString() + j.toString();
};

let updateBoard = () => {
  for (let i = 0; i < grid.length; i++) {
    if (i > rowSize - 1) {
      return;
    }
    for (let j = 0; j < grid[i].length; j++) {
      let el = document.getElementById(getId(i, j));
      el.innerHTML = grid[i][j].value;
      if (grid[i][j].value !== "") {
        el.classList.add("whiteBk");
      } else {
        el.classList.remove("whiteBk");
      }

      if (grid[i][j].selected === true) {
        el.classList.add("selected");
      } else {
        el.classList.remove("selected");
      }
    }
  }
};

let gameOver = () => {
  if (grid.length < rowSize) {
    return false;
  }
  for (let i = 0; i < columnSize; i++) {
    if (grid[rowSize - 1][i].value !== "") {
      console.log("entered");
      return true;
    }
  }

  return false;
};

const startNewGame = () => {
  grid = [];
  let el = document.getElementById("cell-container");
  document.getElementById("board").removeChild(el);
  initBoard();
  //startTimer();
};

let startTimer = () => {
  addCells();
  updateBoard();
  let id = setInterval(() => {
    addCells();
    updateBoard();
    if (gameOver()) {
      setTimeout(() => {
        clearInterval(id);
        popup();
        // startNewGame();
        return;
      }, 100);
    }
  }, 8000);
};

const deseseelectAllSelected = () => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].selected = false;
    }
  }
};

const updateGrid = () => {
  for (let i = 0; i < columnSize; i++) {
    let k = 0;
    for (let j = 0; j < grid.length; j++) {
      if (j > rowSize - 1) {
        break;
      }
      if (grid[j][i].value !== "") {
        if (k !== j) {
          grid[k][i].value = grid[j][i].value;
          grid[k][i].selected = false;
          grid[j][i].value = "";
          grid[j][i].selected = false;
        }
        k++;
      }
    }
  }
  updateBoard();
  console.log(grid);
};

const removeAllSelected = () => {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].selected) {
        count++;
        grid[i][j].value = "";
        grid[i][j].selected = false;
      }
    }
  }
  updateGrid();
  return count;
};
const handleClick = (event, i, j) => {
  if (grid[i][j] === "") {
    return;
  }
  grid[i][j].selected = !grid[i][j].selected;
  if (grid[i][j].selected) {
    currentSum += grid[i][j].value;
  } else {
    currentSum -= grid[i][j].value;
  }
  if (currentSum > target) {
    deseseelectAllSelected();
    currentSum = 0;
  } else if (currentSum === target) {
    let noOfCellsRemoved = removeAllSelected();
    score += noOfCellsRemoved;
    initTarget();
    updateScore(score);
    currentSum = 0;
  }
  document.getElementById("currentSum").innerHTML = currentSum;
  updateBoard();
};

const initBoard = () => {
  let board = document.getElementById("board");
  let cellConatiner = document.createElement("div");
  cellConatiner.setAttribute("id", "cell-container");
  for (let i = 0; i < rowSize; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < columnSize; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("id", getId(i, j));
      cell.classList.add("cell");
      cell.classList.add("center");
      //cell.setAttribute("Selected", false);
      cell.addEventListener("click", (event) => handleClick(event, i, j));
      row.appendChild(cell);
    }
    cellConatiner.appendChild(row);
  }
  board.appendChild(cellConatiner);
  initTarget();
  updateScore(0);
};
initBoard();
startTimer();
