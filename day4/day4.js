const fs = require('fs');

const data = fs.readFileSync('./day4.txt', 'utf8').trim().split('\n');

let moves = data.slice(0, 1);
moves = moves[0].split(',');
// console.log(boardData);
class Board {
  constructor(arrayOfStrings) {
    console.log(arrayOfStrings);
    this.board = this.createBoard(arrayOfStrings);
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
  
}

const boardData = createBoardData(data);

function createBoardData(data) {
  let tidyData = data.slice(1);
  tidyData = tidyData.filter((input) => input != '');
  // console.log(tidyData);
  const boards = [];
  while (tidyData.length > 0) {
    boards.push(new Board(tidyData.splice(0, 5)));
    tidyData.splice(0, 5);
  }
  return boards;
}

console.log(boardData[0]);

// console.log(data);
// // const moves = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1];
