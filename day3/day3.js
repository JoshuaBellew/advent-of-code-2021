const {assert}=require('console');
const fs = require('fs');

let diagnosticReport = fs.readFileSync('./input.txt', 'utf8').trim().split('\n')
// let diagnosticReport = ['00100','10110',
//   '11110',
//   '10111',
//   '10101',
//   '01111',
//   '00111',
//   '11100',
//   '10000',
//   '11001',
//   '00010',
//   '01010']
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
    return this.up >= this.down ? '1' : '0';
  }
  
  leastCommonBit() {
    return this.up >= this.down ? '0' : '1';
  }
}

/*
Gamma rate: 101111001110
Gamma number 3022
Epsilon rate: 010000110001
Epsilon number 1073
Total power: 3242606
*/
/*
1. Loop over each row
2. remove row if bits dont match
3. Once rows for first bit have been removed, recalculate next bit position, most common bit
*/

function calcMostCommonBitForColumn(fullReport, columnPosition) {
  const result = new Position();
  for (const row of fullReport) {
    result.incrementPosition(row[columnPosition]);
  }
  return result.mostCommonBit()
}

function calcLeastCommonBitForColumn(fullReport, columnPosition) {
  const result = new Position();
  for (const row of fullReport) {
    result.incrementPosition(row[columnPosition]);
  }
  return result.leastCommonBit()
}

function oxygenGenerator(diagnosticReport) {
  for(let bitPos=0; bitPos < diagnosticReport[0].length; bitPos++) {
    let mostCommonBit=calcMostCommonBitForColumn(diagnosticReport,bitPos);
    console.log(mostCommonBit);

    diagnosticReport=diagnosticReport.filter((diagRow) => {
      if(diagRow[bitPos]==mostCommonBit) {
        return true;
      } else {
        return false;
      }
    });
  }
  return diagnosticReport
}



function CO2Rating(diagnosticReport) {
  const length = diagnosticReport.length;
  for(let bitPos=0; bitPos < length; bitPos++) {
    let leastCommonBit = calcLeastCommonBitForColumn(diagnosticReport,bitPos);
    // console.log(leastCommonBit ) ;

    diagnosticReport = diagnosticReport.filter((diagRow) => {
      if(diagnosticReport.length === 1){return true}
      if(diagRow[bitPos] == leastCommonBit) {
        return true;
      } else {
        return false;
      }
    });
  }
  return diagnosticReport
}



const oxygenRating = oxygenGenerator(diagnosticReport);
console.log(oxygenRating); // oxygen = '101110111101'

// console.log(diagnosticReport);
const co2Scrubber = CO2Rating(diagnosticReport);
console.log(co2Scrubber)


function calculateBinaryNumbers(binary1, binary2) {
  return parseInt(binary1, 2) * parseInt(binary2, 2)
}

console.log(calculateBinaryNumbers(oxygenRating, co2Scrubber));
