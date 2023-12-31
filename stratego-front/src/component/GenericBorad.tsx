import React, { useCallback, useEffect, useState } from "react";
import "../styles/gameborad.css";
import Piece from "../component/piece";
import {User} from '../models/user';

const numRows = 10;
const numCols = 10;

const initialBoardState: string[][] = Array(numRows)
.fill(null)
.map(() => Array(numCols).fill(""));

export const GenericBorad: React.FC<{
    handleSubmit: (board: string[][]) => void
}> = ({ handleSubmit }) => {
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
  const [_user, setUser] = useState<User | null>(null);


  const getUser = useCallback(() => {
    return {id: '0',
    userName: 'player1',
    points: 0,
    board: board,
    gamesPlayed: 0,
    imageBase64: '',
    boards: []}
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
        const isTopHalf = row < numRows / 2 ;

        cells.push(
          <div
            key={`${row}-${col}`}
            className={`cell ${isTopHalf ? 'top-half' : 'bottom-half'}`}
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

  return (
    <div>
  <div className="container">
    <div className="game-board">{renderCells()}</div>
    <div className="piece-container">
      {Flag && <Piece type="Flag" rank={"F"} />}
      {Bomb && <Piece type="Bomb" rank={"B"} />}
      {Spy && <Piece type="Spy" rank={"1"} />}
      {Scout && <Piece type="Scout" rank={"2"} />}
      {Miner && <Piece type="Miner" rank={"3"} />}
      {Sergeant && <Piece type="Sergeant" rank={"4"} />}
      {Lieutenant && <Piece type="Lieutenant" rank={"5"} />}
      {Captain && <Piece type="Captain" rank={"6"} />}
      {Major && <Piece type="Major" rank={"7"} />}
      {Colonel && <Piece type="Colonel" rank={"8"} />}
      {General && <Piece type="General" rank={"9"} />}
      {Marshal && <Piece type="Marshal" rank={"10"} />}
    </div>
  </div>
  <div className="d-flex justify-content-end">
    <button className="btn btn-outline-danger mx-5" type="submit" onClick={() => handleSubmit(board)}>Submit</button>
  </div>
</div>

  );
};


export default GenericBorad;
