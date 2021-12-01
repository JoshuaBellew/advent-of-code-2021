const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').toString().split('\n');

let index = 0;
let window = 1;

const array_of_windows = [];

for (const current_value of data) {
  
  if(index < 2) { 
    index++
    window++
    continue
  }
  
  if (window >= 3){
    let value = Number(data[index]) + Number(data[index-1]) + Number(data[index-2])
    array_of_windows.push(value);
  }
  index++;
  window++;
}

let num_of_increases = 0;
let new_index = 0;

for(num of array_of_windows) {
  if(new_index===0){
    new_index++
    continue
  }
  
  if(num>array_of_windows[new_index-1]){
    num_of_increases++
  }
  new_index++
}

console.log(num_of_increases)
// console.log(array_of_windows)
console.log(array_of_windows.length, data.length)


// for (const current_value of data) {
//   if(data[0] === current_value) {
//     previous_value = Number(current_value);
//     continue
//    }; 
  
//   if(Number(current_value) > previous_value) {
//     num_of_increases++;
//   }
//   previous_value = Number(current_value);
  
//   index++;
// }