import React, { useEffect, useState } from "react";
import "../styles/gameborad.css";
import Piece from "../component/piece";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import axios from "axios";

const numRows = 10;
const numCols = 10;

const initialBoardState: string[][] = [
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  [
    "Scout",
    "Scout",
    "Scout",
    "Scout",
    "Scout",
    "Bomb",
    "Bomb",
    "Bomb",
    "Bomb",
    "Bomb",
  ],
  ["Scout", "Scout", "Scout", "Miner", "Miner", "", "", "", "", ""],
  ["", "", "", "", "Miner", "Bomb", "Spy", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "Flag"],
];

const initialPlayers: User[] = [
  { id: "1", userName: "Player1", points: 0, board: initialBoardState },
  { id: "2", userName: "Player2", points: 0, board: initialBoardState },
];

export const PlayGame = () => {
  const [board, setBoard] = useState(initialBoardState);
  const [players, setPlayers] = useState<User[]>(initialPlayers);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<User | null>(null);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("api/user/board");
        if (response.data && response.data.length >= 2) {
          const fetchedPlayers = response.data.slice(0, 2).map((user: any) => ({
            id: user.id,
            userName: user.userName,
            points: user.points,
            board: user.board,
          }));
          setPlayers(fetchedPlayers);
          setCurrentPlayer(
            isPlayer1Turn ? fetchedPlayers[1] : fetchedPlayers[0]
          );
          console.log("Got players", response);
        }
      } catch (error) {
        console.log("Getting users had a problem");
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, [isPlayer1Turn]);

  const combinedBoard = () => {
    const collaborativeBoard: JSX.Element[] = [];
    const halfRows = numRows / 2;

    for (let row = halfRows - 1; row >= 0; row--) {
        const rowElements: JSX.Element[] = [];
        for (let col = numCols - 1; col >= 0; col--) {
          const piece = players[0].board[row + halfRows][col];
          const isSelected =
            selectedPiece && selectedPiece.row === row + halfRows && selectedPiece.col === col;
      
          rowElements.push(
            <button
              key={`${row}-${col}`}
              style={{ color: isSelected ? "green" : "blue" }}
              className="cell"
              onClick={() => handlePieceClick(row + halfRows, col)}
            >
              {piece && <Piece type={piece} rank="0" />}
            </button>
          );
        }
        collaborativeBoard.push(
          <div
            key={`player1-${row}`}
            className="row d-flex justify-content-center"
          >
            {rowElements}
          </div>
        );
      }
      
      // Render the second player's board
      for (let row = halfRows; row < numRows; row++) {
        const rowElements: JSX.Element[] = [];
        for (let col = 0; col < numCols; col++) {
          const piece = players[1].board[row][col];
          const isSelected = selectedPiece && selectedPiece.row === row && selectedPiece.col === col;
      
          rowElements.push(
            <button
              key={`${row}-${col}`}
              style={{ color: isSelected ? "green" : "red" }}
              className="cell"
              onClick={() => handlePieceClick(row, col)}
            >
              {piece && <Piece type={piece} rank="0" />}
            </button>
          );
        }
        collaborativeBoard.push(
          <div
            key={`player2-${row}`}
            className="row d-flex justify-content-center"
          >
            {rowElements}
          </div>
        );
      }
      
      return collaborativeBoard;
  };

  const handlePieceClick = (row: number, col: number) => {
    if (
      (isPlayer1Turn && row < numRows / 2 && players[0].board[row][col]) ||
      (!isPlayer1Turn && row >= numRows / 2 && players[1].board[row][col])
    ) {
      // If the clicked cell contains a piece of the current player
      setSelectedPiece({ row, col });
    } else {
      setSelectedPiece(null);
    }
  };

  const movePiece = (direction: "up" | "down" | "left" | "right") => {
    if (selectedPiece) {
      const { row, col } = selectedPiece;

      // Update the board based on the movement direction
      const updatedBoard = [...players[isPlayer1Turn ? 0 : 1].board];

      switch (direction) {
        case "up":
          if (row > 0) {
            updatedBoard[row - 1][col] = players[isPlayer1Turn ? 0 : 1].board[row][col];
            updatedBoard[row][col] = "";
          }
          break;
        case "down":
          if (row < numRows - 1) {
            updatedBoard[row + 1][col] = players[isPlayer1Turn ? 0 : 1].board[row][col];
            updatedBoard[row][col] = "";
          }
          break;
        case "left":
          if (col > 0) {
            updatedBoard[row][col - 1] = players[isPlayer1Turn ? 0 : 1].board[row][col];
            updatedBoard[row][col] = "";
          }
          break;
        case "right":
          if (col < numCols - 1) {
            updatedBoard[row][col + 1] = players[isPlayer1Turn ? 0 : 1].board[row][col];
            updatedBoard[row][col] = "";
          }
          break;
        default:
          break;
      }

      const updatedPlayers = [...players];
      updatedPlayers[isPlayer1Turn ? 0 : 1].board = updatedBoard;

      setPlayers(updatedPlayers);
      setSelectedPiece(null);
      setIsPlayer1Turn((prevIsPlayer1Turn) => !prevIsPlayer1Turn);
    }
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
      <div className=" row d-flex justify-content-start">
        <h3>
          {players[0].userName} score: {players[0].points}
        </h3>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col col-7">{combinedBoard()}</div>
        <div className="col col-5">
          <div className="row d-flex justify-content-center">
            <button onClick={() => movePiece("up")}>Move Up</button>
          </div>
          <div className="row">
            <div className="col col-6 justify-content-end">
              <button onClick={() => movePiece("left")}>Move Left</button>
            </div>
            <div className="col col-6 justify-content-start">
            <button onClick={() => movePiece("right")}>Move Right</button>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <button onClick={() => movePiece("down")}>Move Down</button>

          </div>
        </div>
      </div>
      <div className=" row d-flex justify-content-end">
        <h3>
          {players[1].userName} score: {players[1].points}
        </h3>
      </div>
    </div>
  );
};
