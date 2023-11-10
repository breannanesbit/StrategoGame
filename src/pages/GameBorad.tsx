import React, { useState } from 'react';
import "../styles/gameborad.css";
import Piece from '../component/piece';

const numRows = 10;
const numCols = 10;

const initialBoardState: string[][] = Array(numRows)
  .fill(null)
  .map(() => Array(numCols).fill(''));

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState(initialBoardState);

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cell = e.currentTarget as HTMLElement;
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    if (row && col) {
      const parsedRow = parseInt(row);
      if (!isNaN(parsedRow) && parsedRow > numRows / 2) {
        e.dataTransfer.dropEffect = 'copy'; // Allow dropping on the bottom half
      } else {
        e.dataTransfer.dropEffect = 'none'; // Disallow dropping on the top half
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cell = e.currentTarget as HTMLElement;
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    const pieceType = e.dataTransfer.getData('text/plain');
    if (row && col) {
      const parsedRow = parseInt(row);
      if (!isNaN(parsedRow) && parsedRow > numRows / 2) {
        const updatedBoard = [...board];
        updatedBoard[parsedRow][parseInt(col)] = pieceType;
        setBoard(updatedBoard);
      }
    }
  };

  const renderCells = () => {
    const cells: JSX.Element[] = [];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        cells.push(
          <div
            key={`${row}-${col}`}
            className="cell"
            data-row={row}
            data-col={col}
            onDrop={handleDrop}
            onDragOver={allowDrop}
          >
            {board[row][col] && <Piece type={board[row][col]} />}
          </div>
        );
      }
    }

    return cells;
  };

  return (
    <div className="game-board">
      {renderCells()}
      <div className="piece-container">
        <Piece type="Flag" />
        <Piece type="Bomb" />
        {/* Add more pieces as needed */}
      </div>
    </div>
  );
};

export default GameBoard;