const fs = require('fs');

const data = fs.readFileSync('./day4.txt', 'utf8').trim().split('\n');

let moves = data.slice(0, 1);
moves = (moves[0].split(',')).map(x => Number(x));
const calledMoves = [];
class Board {
  constructor(arrayOfStrings) {
    this.board = this.createBoard(arrayOfStrings);
    this.boardLength = 5;
    this.allCombinations = this.createAllCombinations(this.board);
  }
  
  createBoard(dirtyArray) {
    let board = [];
    let re = /\s+/
    for (const row of dirtyArray) {
      let newRow = row.trim().split(re);
      newRow = newRow.map(x => Number(x));
      board.push(newRow);
    }
    return board;
  }
  
  createAllCombinations(board) {
    let allCombinations = board.slice();
    let singleCombination = [];
    
    for (let pos = 0; pos < this.boardLength; pos++) {
      for (let row = 0; row < this.boardLength; row++) {
        singleCombination.push(board[row][pos]);
      }
      allCombinations.push(singleCombination);
      singleCombination = [];
    }
    return allCombinations;
    // console.log(allCombinations);
  }
  
  checkForWinner() {
    for (const eachCombination of this.allCombinations) {
      let result = eachCombination.every((x) => calledMoves.includes(x));
      if (result === true) {
        console.log("WINNER");
        winner = { winner: this, combination: eachCombination }
      }
    }
  }
}

const allGameBoards = createBoardData(data);
console.log(allGameBoards);
function createBoardData(data) {
  let tidyData = data.slice(1);
  tidyData = tidyData.filter((input) => input != '');
  const boards = [];
  while (tidyData.length > 0) {
    boards.push(new Board(tidyData.splice(0, 5)));
    tidyData.splice(0, 5);
  }
  return boards;
}

function rollBingoMove(allMoves) {
  // console.log("rolling bingo....");
  let pluckedNum = allMoves.shift();
  calledMoves.push(pluckedNum);
  // console.log(allMoves.length);
  return allMoves;
}

let winner = null;

function startGame() {
  let allMoves = moves.slice();
  while (winner === null) {
    allMoves = rollBingoMove(allMoves);
    for (const eachBoard of allGameBoards) {
      eachBoard.checkForWinner();
    }
  }
  // log out last number called, pop last value from calledMoves
  console.log(winner);
  console.log('last number to be called: ', calledMoves[calledMoves.length-1]);
  let unmarked = [];
  for (const eachRow of winner.winner.board) {
    for (const eachNum of eachRow) {
      if (!calledMoves.includes(eachNum)) {
        unmarked.push(eachNum);
      }
    }
  }
  let sum = unmarked.reduce((prev, current) => prev + current);
  console.log(calledMoves);
  console.log(unmarked, sum);
}
// Part 1 answer 39902
startGame();