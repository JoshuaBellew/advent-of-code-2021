const fs = require('fs');

const data = fs.readFileSync('./day2.txt', 'utf8').trim().split('\n')

const board = {
  horizontal: 0,
  depth: 0,
  aim: 0
}

function move(direction_object) {
  switch(direction_object.direction) {
    case 'forward':
      board.horizontal += direction_object.times;
      board.depth += board.aim * direction_object.times;
      break
    case 'down':
      board.aim += direction_object.times;
      break
    case 'up':
      board.aim -= direction_object.times;
  }
}

function split_command(command) {
  const array1 = command.split(' ')
  return {
    direction: array1[0],
    times: Number(array1[1])
  }
}


for (const command of data) {
  move(split_command(command))
}
console.log(board.horizontal * board.depth) // 1905, 907
