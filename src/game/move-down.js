import * as utils from './utils';
import moveLeft from './move-left';

export default function moveUp(inputBoard) {
  const rotate_right = utils.rotateRight(inputBoard);
  console.log(rotate_right);
  const result = moveLeft(rotate_right);
  const rotateleft = utils.rotateLeft(result.board);
  const board = rotateleft;
  return { board: board, score: 0 };
}
