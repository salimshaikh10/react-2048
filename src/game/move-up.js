import * as utils from './utils';
import moveLeft from './move-left';
import movedown from './move-down';

export default function moveUp(inputBoard) {
  const rotate_left = utils.rotateLeft(inputBoard);
  const result = moveLeft(rotate_left);
  const rotateright = utils.rotateRight(result.board);
  const board = rotateright;
  return { board: board, score: 0 };
}
