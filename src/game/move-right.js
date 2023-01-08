export default function moveRight(inputBoard) {
  let board = [];
  let score = 0;

  
  inputBoard.map((val, ind, arr) => {
    const temp = val.filter((i) => i > 0);
    const temp1 = Array(4 - temp.length).fill(0);
    const newarr = temp1.concat(temp);


    newarr.map((val, ind, arr) => {
      const x = arr.length - 1 - ind;
      if ((arr[x] == arr[x - 1] || arr[x] == 0) && arr[x - 1] >= 0) {
        arr[x] += arr[x - 1];
        arr[x - 1] = 0;
        
      }
    });

    board.push([...newarr]);
  });

  return { board, score };
}