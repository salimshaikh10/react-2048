/**
 * Write code to move and merge elements in the left direction.
 */
export default function moveLeft(inputBoard) {
  let board = [];
  let score = 0;

  inputBoard.map((val, ind, arr) => {
    const temp = val
      .filter((i) => i > 0)
      .concat(0, 0, 0, 0)
      .slice(0, 4);

    temp.map((val, ind, arr) => {
      if ((arr[ind] == arr[ind + 1] || val == 0) && ind + 1 != arr.length) {
        arr[ind] += arr[ind + 1];
        arr[ind + 1] = 0;
      }
    });

    board.push([...temp]);
  });

  return { board, score };
}
