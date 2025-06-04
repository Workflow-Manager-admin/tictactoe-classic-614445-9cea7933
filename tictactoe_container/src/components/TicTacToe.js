import React, { useState } from 'react';
import './TicTacToe.css';

// PUBLIC_INTERFACE
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Calculate winner by checking all possible winning combinations
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal
      [2, 4, 6], // diagonal
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Handle click on a square
  const handleClick = (index) => {
    // If square is filled or there's a winner, ignore the click
    if (board[index] || calculateWinner(board)) {
      return;
    }

    // Create new board state with the move
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Render a single square
  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  // Determine game status
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  const status = winner 
    ? `Winner: ${winner}`
    : isDraw 
    ? "Game is a draw!" 
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-status">{status}</div>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
