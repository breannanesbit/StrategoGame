import React, { useCallback, useEffect, useState } from "react";
import "../styles/gameborad.css";
import Piece from "../component/piece";
import { Link } from "react-router-dom";
import axios from 'axios';
import {User} from '../models/user';
import {toast} from "react-hot-toast";

const numRows = 10;
const numCols = 10;

const initialBoardState: string[][] = Array(numRows)
.fill(null)
.map(() => Array(numCols).fill(""));

const GameBoard: React.FC = () => {
  const [board, setBoard] = useState(initialBoardState);
  const [Bomb, setBoomCount] = useState(6);
  const [Spy, setSpyCount] = useState(1);
  const [Scout, setScoutCount] = useState(8);
  const [Miner, setMinerCount] = useState(5);
  const [Sergeant, setSergeantCount] = useState(4);
  const [Lieutenant, setLieutenantCount] = useState(4);
  const [Captain, setCaptainCount] = useState(4);
  const [Major, setMajorCount] = useState(3);
  const [Colonel, setColonelCount] = useState(2);
  const [General, setGeneralCount] = useState(1);
  const [Marshal, setMarshalCount] = useState(1);
  const [Flag, setFlagCount] = useState(1);
  const [user, setUser] = useState<User | null>(null);


  const getUser = useCallback(() => {
    return {id: '0',
    userName: 'player1',
    points: 0,
    board: board,
    gamesPlayed: 0}
     // get userid from authentication
  }, [board])

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUser(user);
    }
  }, [getUser]);

  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cell = e.currentTarget as HTMLElement;
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    if (row && col) {
      const parsedRow = parseInt(row);
      if (!isNaN(parsedRow) && parsedRow > numRows / 2) {
        e.dataTransfer.dropEffect = "copy"; // Allow dropping on the bottom half
      } else {
        e.dataTransfer.dropEffect = "none"; // Disallow dropping on the top half
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cell = e.currentTarget as HTMLElement;
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    const pieceType = e.dataTransfer.getData("text/plain");
    if (row && col) {
      const parsedRow = parseInt(row);
      if (!isNaN(parsedRow) && parsedRow > numRows / 2) {
        const updatedBoard = [...board];
        updatedBoard[parsedRow][parseInt(col)] = pieceType;
        setBoard(updatedBoard);

        switch (pieceType) {
          case "Bomb":
            setBoomCount(Bomb - 1);
            break;
          case "Flag":
            setFlagCount(Flag - 1);
            break;
          case "Marshal":
            setMarshalCount(Marshal - 1);
            break;
          case "General":
            setGeneralCount(General - 1);
            break;
          case "Colonel":
            setColonelCount(Colonel - 1);
            break;
          case "Major":
            setMajorCount(Major - 1);
            break;
          case "Captain":
            setCaptainCount(Captain - 1);
            break;
          case "Lieutenant":
            setLieutenantCount(Lieutenant - 1);
            break;
          case "Sergeant":
            setSergeantCount(Sergeant - 1);
            break;
          case "Miner":
            setMinerCount(Miner - 1);
            break;
          case "Scout":
            setScoutCount(Scout - 1);
            break;
          case "Spy":
            setSpyCount(Spy - 1);
            break;
        }
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
            {board[row][col] && <Piece type={board[row][col]} rank="0" />}
          </div>
        );
      }
    }

    return cells;
  };

  
  const handleSubmit = async () => {
    
  }
  return (
    <div>
      <div className=" d-flex justify-content-end">
        <button className="btn btn-outline-danger mx-5" type="submit" onClick={handleSubmit}>
          <Link style={{ textDecoration: 'none', color: 'red' }} to={'/playGame'}>Start Game</Link>
        </button>
      </div>
      <div className="game-board">{renderCells()}</div>
      {Flag && (
        <div className="piece-container">
          <Piece type="Flag" rank={"F"} />
        </div>
      )}
      {Bomb && (
        <div className="piece-container">
          <Piece type="Bomb" rank={"B"} />
        </div>
      )}
      {Spy && (
        <div className="piece-container">
          <Piece type="Spy" rank={"1"} />
        </div>
      )}
      {Scout && (
        <div className="piece-container">
          <Piece type="Scout" rank={"2"} />
        </div>
      )}
      {Miner && (
        <div className="piece-container">
          <Piece type="Miner" rank={"3"} />
        </div>
      )}
      {Sergeant && (
        <div className="piece-container">
          <Piece type="Sergeant" rank={"4"} />
        </div>
      )}
      {Lieutenant && (
        <div className="piece-container">
          <Piece type="Lieutenant" rank={"5"} />
        </div>
      )}
      {Captain && (
        <div className="piece-container">
          <Piece type="Captain" rank={"6"} />
        </div>
      )}
      {Major && (
        <div className="piece-container">
          <Piece type="Major" rank={"7"} />
        </div>
      )}
      {Colonel && (
        <div className="piece-container">
          <Piece type="Colonel" rank={"8"} />
        </div>
      )}
      {General && (
        <div className="piece-container">
          <Piece type="General" rank={"9"} />
        </div>
      )}
      {Marshal && (
        <div className="piece-container">
          <Piece type="Marshal" rank={"10"} />
        </div>
      )}
    </div>
  );
};

export default GameBoard;
