// Piece.tsx
import "../styles/homepage.css";

import React from 'react';

interface PieceProps {
  type: string; 
  rank: string;
}

const Piece: React.FC<PieceProps> = ({ type }) => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', type);
      }}
      className="piece"
    >
      {type}
    </div>
  );
};

export default Piece;
