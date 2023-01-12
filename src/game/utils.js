export function rotateRight(matrix) {
  let result = [];


  
  matrix.map((e) => {
    let arr = [...e];
    arr.reverse();
    result.push(arr);
  });


  return result;
}


export function rotateLeft(matrix) {
  let result = [];

  for (let c = matrix.length - 1; c >= 0; c--) {
    let row = [];
    for (let r = matrix.length - 1; r >= 0; r--) {
      row.unshift(matrix[r][c]);
    }
    result.push(row);
  }

  return result;
}


export function flip(matrix) {
  // return matrix;
  return matrix.map((row) => [...row.reverse()]);
}
