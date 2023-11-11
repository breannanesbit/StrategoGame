import React, { useState } from "react";
import "../styles/gameborad.css";
import Piece from "../component/piece";
import { Link } from "react-router-dom";

export interface Player {
  id: number;
  userName: string;
  board: string[][];
}
const numRows = 10;
const numCols = 10;

const initialBoardState: string[][] = Array(numRows)
  .fill(null)
  .map(() => Array(numCols).fill(""));

const initialPlayers: Player[] = [
  { id: 1, userName: "Player1", board: initialBoardState },
  { id: 2, userName: "Player2", board: initialBoardState },
];

export const PlayGame = () => {
  const [board, setBoard] = useState(initialBoardState);
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  //get both halfs of the board given by two players and make it into one
  const handleMove = (
    selectedPiece: string,
    targetSquare: { row: number; col: number }
  ) => {
    //move pieces one at a time
    //show a score by the players name for each piece they over take
  };

  return (
    <div>
      <div className="row">
        <h1 className="col col-7">Game in Progress</h1>
        <div className="col col-5 d-flex justify-content-end">
          {/* <button className="btn btn-outline-danger mx-5">
            <Link
              style={{ textDecoration: "none", color: "red" }}
              to={"/gameOver"}
            >
              Game Over
            </Link>
          </button> */}
        </div>
      </div>
      {/* //display current user */}
      <div className=" row d-flex justify-content-start">
        <h2></h2>
      </div>
      {/* //display colaborative board - only the current players pieces have
      different icons the enemy have the same icon //display enemy board */}
    </div>
  );
};
