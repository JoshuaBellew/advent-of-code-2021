const {assert}=require('console');
const fs = require('fs');
const {CLIENT_RENEG_LIMIT}=require('tls');

const diagnosticReport = fs.readFileSync('./input.txt', 'utf8').trim().split('\n')

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

function countNumberOfBits() {
  for(const binaryString of diagnosticReport) {
    for(let i=0;i<binaryString.length;i++) {
      const currentPosition=getCurrentPosition(i);

      currentPosition.incrementPosition(binaryString[i]);
    }
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

countNumberOfBits();

const tally = tallyNumberOfBits();

function tallyNumberOfBits() {
  let gammaRate = '';
  let epsilonRate = '';
  for(const pos of totalPositions) {
    gammaRate+=pos.mostCommonBit();
    epsilonRate+=pos.leastCommonBit();
  }
  
  return { gammaRate, epsilonRate }
}

function getGammaRateForPosition(position) {
  return position.mostCommonBit()
}
const gammaRateNum = parseInt(tally.gammaRate, 2);
const epsilonRateNum = parseInt(tally.epsilonRate, 2);

const powerConsumption = gammaRateNum * epsilonRateNum;
assert(powerConsumption === 3242606);
// console.log(powerConsumption);
/*
Gamma rate: 101111001110
Gamma number 3022
Epsilon rate: 010000110001
Epsilon number 1073
Total power: 3242606
*/
