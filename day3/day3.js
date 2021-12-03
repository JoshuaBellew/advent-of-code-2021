const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').trim().split('\n')

class Position {
  constructor() {
    this.up = 0;
    this.down = 0;
  }
  
  incrementPosition(bit) {
    if (Number(bit) === 1) {
      this.up++
    } else {
      this.down++
    }
  }
  
  mostCommonBit() {
    return this.up > this.down ? '1' : '0';
  }
  
  leastCommonBit() {
    return this.up > this.down ? '0' : '1';
  }
}

const totalPositions = [];

const getCurrentPosition = (index) => {
  if (totalPositions[index]) {
    return totalPositions[index];
  } else {
    totalPositions.push(new Position());
    return totalPositions[index]
  }
}

for (const array of data) {
  for (let i=0; i<array.length; i++) {
    const currentPosition = getCurrentPosition(i);
    
    currentPosition.incrementPosition(array[i]);
  }
}

// console.log(totalPositions);

let gammaRate = '';
let epsilonRate = '';

for (const pos of totalPositions) {
  gammaRate += pos.mostCommonBit();
  epsilonRate += pos.leastCommonBit();
}

const gammaNum = parseInt(gammaRate, 2);
const epsilonNum = parseInt(epsilonRate, 2);

const powerConsumption = gammaNum * epsilonNum;
console.log(powerConsumption);
/*
Gamma rate: 101111001110
Gamma number 3022
Epsilon rate: 010000110001
Epsilon number 1073
Total power: 3242606
*/
