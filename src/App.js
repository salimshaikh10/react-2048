import React from 'react';
import './style.css';
import moveUp from './game/move-up';
import moveLeft from './game/move-left';
import moveRight from './game/move-right';
import moveDown from './game/move-down';
function clone(twoDimensionalArray) {
  return twoDimensionalArray.map((row) => row.map((col) => col));
}
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: null,
      score: 0,
      gameOver: false,
      message: null,
    };
  }

  // Create board with two random coordinate numbers
  initBoard() {
    let board = [
      [2, 0, 2, 2],
      [0, 2, 2, 0],
      [2, 2, 0, 2],
      [0, 2, 0, 2],
    ];
    
    this.setState({ board, score: 0, gameOver: false, message: null });
  }

  // Get all blank coordinates from board
  getBlankCoordinates(board) {
    const blankCoordinates = [];

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === 0) {
          blankCoordinates.push([r, c]);
        }
      }
    }

    return blankCoordinates;
  }

  // Grab random start number
  randomStartingNumber() {
    const startingNumbers = [2, 4];
    const randomNumber =
      startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
    return randomNumber;
  }

  // Place random starting number on an empty coordinate
  placeRandom(board) {
    const blankCoordinates = this.getBlankCoordinates(board);
    const randomCoordinate =
      blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
    const randomNumber = this.randomStartingNumber();
    board[randomCoordinate[0]][randomCoordinate[1]] = randomNumber;
    return board;
  }

  // Compares two boards to check for movement
  boardMoved(original, updated) {
    return JSON.stringify(updated) !== JSON.stringify(original) ? true : false;
  }

  // Moves board depending on direction and checks for game over
  move(direction) {
    if (!this.state.gameOver) {
      if (direction === 'up') {
        const movedUp = moveUp(clone(this.state.board));
        if (this.boardMoved(this.state.board, movedUp.board)) {
          const upWithRandom = this.placeRandom(movedUp.board);

          if (this.checkForGameOver(upWithRandom)) {
            this.setState({
              board: upWithRandom,
              gameOver: true,
              message: 'Game over!',
            });
          } else {
            this.setState({
              board: upWithRandom,
              score: (this.state.score += movedUp.score),
            });
          }
        }
      } else if (direction === 'right') {
        const movedRight = moveRight(clone(this.state.board));
        if (this.boardMoved(this.state.board, movedRight.board)) {
          const rightWithRandom = this.placeRandom(movedRight.board);

          if (this.checkForGameOver(rightWithRandom)) {
            this.setState({
              board: rightWithRandom,
              gameOver: true,
              message: 'Game over!',
            });
          } else {
            this.setState({
              board: rightWithRandom,
              score: (this.state.score += movedRight.score),
            });
          }
        }
      } else if (direction === 'down') {
        const movedDown = moveDown(clone(this.state.board));
        if (this.boardMoved(this.state.board, movedDown.board)) {
          const downWithRandom = this.placeRandom(movedDown.board);

          if (this.checkForGameOver(downWithRandom)) {
            this.setState({
              board: downWithRandom,
              gameOver: true,
              message: 'Game over!',
            });
          } else {
            this.setState({
              board: downWithRandom,
              score: (this.state.score += movedDown.score),
            });
          }
        }
      } else if (direction === 'left') {
        const movedLeft = moveLeft(clone(this.state.board));
        if (this.boardMoved(this.state.board, movedLeft.board)) {
          const leftWithRandom = this.placeRandom(movedLeft.board);

          if (this.checkForGameOver(leftWithRandom)) {
            this.setState({
              board: leftWithRandom,
              gameOver: true,
              message: 'Game over!',
            });
          } else {
            this.setState({
              board: leftWithRandom,
              score: (this.state.score += movedLeft.score),
            });
          }
        }
      }
    } else {
      this.setState({ message: 'Game over. Please start a new game.' });
    }
  }

  // Check to see if there are any moves left
  checkForGameOver(board) {
    let moves = [
      this.boardMoved(board, moveUp(clone(board)).board),
      this.boardMoved(board, moveRight(clone(board)).board),
      this.boardMoved(board, moveDown(clone(board)).board),
      this.boardMoved(board, moveLeft(clone(board)).board),
    ];

    return moves.includes(true) ? false : true;
  }

  componentWillMount() {
    this.initBoard();
    const body = document.querySelector('body');
    body.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(e) {
    const up = 38;
    const right = 39;
    const down = 40;
    const left = 37;
    const n = 78;

    if (e.keyCode === up) {
      this.move('up');
    } else if (e.keyCode === right) {
      this.move('right');
    } else if (e.keyCode === down) {
      this.move('down');
    } else if (e.keyCode === left) {
      this.move('left');
    } else if (e.keyCode === n) {
      this.initBoard();
    }
  }

  render() {
    return (
      <div>
        <div
          className="button"
          onClick={() => {
            this.initBoard();
          }}
        >
          New Game
        </div>

        <div className="buttons">
          <div
            className="button"
            onClick={() => {
              this.move('up');
            }}
          >
            Up
          </div>
          <div
            className="button"
            onClick={() => {
              this.move('right');
            }}
          >
            Right
          </div>
          <div
            className="button"
            onClick={() => {
              this.move('down');
            }}
          >
            Down
          </div>
          <div
            className="button"
            onClick={() => {
              this.move('left');
            }}
          >
            Left
          </div>
        </div>

        <div className="score">Score: {this.state.score}</div>

        <table>
          {this.state.board.map((row, i) => (
            <Row key={i} row={row} />
          ))}
        </table>

        <p>{this.state.message}</p>
      </div>
    );
  }
}

const Row = ({ row }) => {
  return (
    <tr>
      {row.map((cell, i) => (
        <Cell key={i} cellValue={cell} />
      ))}
    </tr>
  );
};

const Cell = ({ cellValue }) => {
  let color = 'cell';
  let value = cellValue === 0 ? '' : cellValue;
  if (value) {
    color += ` color-${value}`;
  }

  return (
    <td>
      <div className={color}>
        <div className="number">{value}</div>
      </div>
    </td>
  );
};
