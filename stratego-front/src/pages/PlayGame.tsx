import React, { useEffect, useState } from "react";
import "../styles/gameborad.css";
import Piece from "../component/piece";
import { User } from "../models/user";
import axios from "axios";
import { Link } from "react-router-dom";

const numRows = 10;
const _numCols = 10;
  
const initialBoardState: string[][] = [
  ["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["Scout","Scout","Scout","Scout","Scout","Bomb","Bomb","Bomb","Bomb","Bomb",],["Scout", "Scout", "Scout", "Miner", "Miner", "", "", "", "", ""],["", "", "", "", "Miner", "Bomb", "Spy", "", "", ""],["", "", "", "", "", "", "", "", "", "Flag"],
];

const initialPlayers: User[] = [
  { id: "1", userName: "Player1", points: 0, board: initialBoardState , gamesPlayed: 20},
  { id: "2", userName: "Player2", points: 0, board: initialBoardState , gamesPlayed: 0},
];

export const PlayGame = () => {
  const [board, setBoard] = useState(initialBoardState);
  const [players, setPlayers] = useState<User[]>(initialPlayers);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [isSelected, _setIsSelected] = useState<boolean>(false);
  const [selectedPiece, setSelectedPiece] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<User | null>(null);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);

  useEffect(() => {
    if (selectedPiece) {
      setSelectedCell({ row: selectedPiece.row, col: selectedPiece.col });
    }
  }, [selectedPiece]);


  

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
        setCurrentPlayer(players[1]);
      }
    };

    const combinedBoard = () => {
      const player1LastHalf = flipAndInvertBoard(players[0].board).slice(0, numRows/2);
      console.log("half",player1LastHalf)
      const player2LastHalf = players[1].board.slice(numRows / 2, numRows);
      console.log("half2",player2LastHalf)
      const setupBoard = player1LastHalf.concat(player2LastHalf)
      console.log("half2",setupBoard)
      setBoard(setupBoard)
    };
    getUsers();
    combinedBoard()
  }, [isPlayer1Turn, players]);

  const flipAndInvertBoard = (originalBoard: string[][]) => {
    const flippedv = originalBoard.slice().reverse();
    const flippedh = flippedv.map(row => row.slice().reverse());
    console.log(flippedh)
    return flippedh
  };
  const handleCellClick = (row: number, col: number) => {
    console.log("currentplayer", currentPlayer);

    console.log("clicked button", isSelected);
    if (!selectedPiece) {
      const piece = board[row][col];
      console.log("row and col", row, col);
      console.log("board", board[row][col]);

      console.log("piece ", piece, "currentplayer ", currentPlayer);
      if (piece && currentPlayer && piece !== "Flag") {
        if (
          (currentPlayer.id === players[0].id && row < numRows / 2) ||
          (currentPlayer.id === players[1].id && row >= numRows / 2)
        ) {
          setSelectedPiece({ row, col });
          setSelectedCell({ row, col });
          console.log("cell", row, col);
        }
      }
    } else {
      console.log("move piece");
      movePiece(row, col);
    }
  };

  const movePiece = async (directionRow: number, directionCol: number) => {
    if (selectedPiece) {
      const { row, col } = selectedPiece;
      const toRow = row + directionRow;
      const toCol = col + directionCol;

      if (isValidMove(row, col, toRow, toCol)) {
        const updatedBoard = [...board];
        if (updatedBoard[toRow][toCol] !== "") {
          const attackingPiece = updatedBoard[row][col];
          const defendingPiece = updatedBoard[toRow][toCol];
          if (isOpponentsPiece(attackingPiece, defendingPiece)) {
            const attackerWins = compareRanks(attackingPiece, defendingPiece);
            if (attackerWins) {
              updatedBoard[toRow][toCol] = attackingPiece;
              updatedBoard[row][col] = "";
              updateScores(attackingPiece, defendingPiece);
            } else {
              updatedBoard[row][col] = "";
            }
          }
        } else {
          updatedBoard[toRow][toCol] = updatedBoard[row][col];
          updatedBoard[row][col] = "";
        }
        await saveBoardToServer(updatedBoard);
        setIsPlayer1Turn(!isPlayer1Turn);
        setBoard(updatedBoard);
        setSelectedPiece({ row: toRow, col: toCol });
      }
    }
  };
  const saveBoardToServer = async (updatedBoard: string[][]) => {
    try {
      const currentPlayerIndex = isPlayer1Turn ? 0 : 1;
      const currentPlayerId = players[currentPlayerIndex].id;
      await axios.post(`api/user/board/${currentPlayerId}`, {
        board: updatedBoard,
      });
      console.log("Board saved to server successfully");
    } catch (error) {
      console.error("Error saving board to server:", error);
    }
  };
  
  const isOpponentsPiece = (attacker: string, defender: string): boolean => {
    console.log(attacker)
    console.log(defender)
    const currentPlayerIndex = isPlayer1Turn ? 0 : 1;
    const attackerPlayerIndex = isPlayer1Turn ? 0 : 1;
  
    return attackerPlayerIndex !== currentPlayerIndex;
  };
  const compareRanks = (attacker: string, defender: string): boolean => {
    const rankMap: { [key: string]: number } = { Scout: 1, Miner: 2, Spy: 3  };
    return rankMap[attacker] >= rankMap[defender];
  };
  
  const updateScores = (attackingPiece: string, defendingPiece: string) => {
    console.log(attackingPiece)
    console.log(defendingPiece)
    const newPlayers = [...players];
    const currentPlayerIndex = isPlayer1Turn ? 0 : 1;
    const _opponentPlayerIndex = isPlayer1Turn ? 1 : 0;
    newPlayers[currentPlayerIndex].points += 1;
  
    setPlayers(newPlayers);
  };
  const isValidMove = (
    _fromRow: number,
    _fromCol: number,
    _toRow: number,
    _toCol: number
  ) => {
    
    return true;
  };
  const renderCellButton = (row: number, col: number) => {
    const piece = board[row][col];
    const isSelected = selectedCell
      ? selectedCell.row === row && selectedCell.col === col
      : false;

    console.log("isSelected loaded", isSelected);
    return (
      <button
        key={`${row}-${col}`}
        onClick={() => handleCellClick(row, col)}
        disabled={!!selectedPiece}
        style={{
          backgroundColor: isSelected ? "lightgreen" : "gray",
          minHeight: "45px",
          minWidth: "45px",
          padding: "0px",
        }}
      >
        {piece && <Piece type={piece} rank={"0"} />}
      </button>
    );
  };


  const display=() => {
    return (
        <div>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {row.map((cell, colIndex) => renderCellButton(rowIndex, colIndex))}
            </div>
          ))}
        </div>
      );
  }
  return (
    <div>
      <div className="row">
        <h1 className="col col-7">Game in Progress</h1>
        <div className="col col-5 d-flex justify-content-end">
          <button className="btn btn-outline-danger mx-5">
            <Link
              style={{ textDecoration: "none", color: "red" }}
              to={"/gameOver"}
            >
              Game Over
            </Link>
          </button>
        </div>
      </div>
      <div className=" row d-flex justify-content-start">
        <h3>
          {players[0].userName} score: {players[0].points}
        </h3>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col col-11">{display()}</div>
      </div>
      <div className=" row d-flex justify-content-end">
        <h3>
          {players[1].userName} score: {players[1].points}
        </h3>
      </div>
      <div className="col col-3">
        <div className="row d-flex justify-content-center">
          <button onClick={() => movePiece(-1, 0)}>Move Up</button>
        </div>
        <div className="row">
          <div className="col col-6 justify-content-end">
            <button onClick={() => movePiece(0, -1)}>Move Left</button>
          </div>
          <div className="col col-6 justify-content-start">
            <button onClick={() => movePiece(0, 1)}>Move Right</button>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <button onClick={() => movePiece(1, 0)}>Move Down</button>
        </div>
      </div>
    </div>
  );
};
