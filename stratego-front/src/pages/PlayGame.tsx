import React, { useEffect, useState, useContext } from "react";
import "../styles/gameborad.css";
import Piece from "../component/piece";
import { User } from "../models/user";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Game } from "../models/game";
import { GameContext } from "../context/gameContext";

const numRows = 10;
const _numCols = 10;

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

// const initialPlayers: Game[] = [
//   { id: "1", Player1: "Player1", Player2: "Player2", Player1Points: 0, Player2Points:0 , board: initialBoardState },
//   // { id: "2", userName: "Player2", points: 500, board: initialBoardState , gamesPlayed: 0},
// ];
//show game id.--------
// identify which player view it is currently
//when game first starts the board will flip it with the players pieces,
//after that the game will use a context and send the current state of the board once a move has been done
// Then we can switch whos turn it is and the other player will take the current board state and movie their pieces
//pieces can go into enemy teritory(need id which player they belong to)
//

export const PlayGame = () => {
  const {
    game,
    isPlayer1Turn,
    player1board,
    player2board,
    setGame,
    setIsPlayer1Turn,
  } = useContext(GameContext);
  const navigate = useNavigate();

  const { board, Player1, Player1Points, Player2, Player2Points } = game;
  const [gameOver, setGameOver] = useState<boolean>(false);

  // const [board, setBoard] = useState(initialBoardState);
  // const [players, setPlayers] = useState<Game[]>(initialPlayers);
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [isSelected, _setIsSelected] = useState<boolean>(false);
  const [selectedPiece, setSelectedPiece] = useState<{
    row: number;
    col: number;
  } | null>(null);
  // const [currentPlayer, setCurrentPlayer] = useState<User | number | null>();
  // const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);

  useEffect(() => {
    if (selectedPiece) {
      setSelectedCell({ row: selectedPiece.row, col: selectedPiece.col });
    }
  }, [selectedPiece]);
  
  useEffect(() => {
    //deselects pieces when player switches.
    setSelectedPiece(null);
    setSelectedCell(null);
  }, [isPlayer1Turn]);

  useEffect(() => {
    // const getUsers = async () => {
    //   try {
    //     const response = await axios.get("api/user/board");
    //     if (response.data && response.data.length >= 2) {
    //       const fetchedPlayers = response.data.slice(0, 2).map((user: any) => ({
    //         id: user.id,
    //         userName: user.userName,
    //         points: user.points,
    //         board: user.board,
    //       }));
    //       setPlayers(fetchedPlayers);
    //       setCurrentPlayer(
    //         isPlayer1Turn ? fetchedPlayers[1] : fetchedPlayers[0]
    //       );
    //       console.log("Got players", response);
    //     }
    //   } catch (error) {
    //     console.log("Getting users had a problem");
    //     console.error("Error fetching users:", error);
    //     setCurrentPlayer(1);
    //   }
    // };

    const combinedBoard = () => {
      const player1LastHalf = flipAndInvertBoard(player1board).slice(
        0,
        numRows / 2
      );
      console.log("half", player1LastHalf);
      const player2LastHalf = player2board.slice(numRows / 2, numRows);
      console.log("half2", player2LastHalf);
      const setupBoard = player1LastHalf.concat(player2LastHalf);
      console.log("half2", setupBoard);
      setGame((prevGame) => ({
        ...prevGame,
        board: setupBoard,
      }));
    };
    //   getUsers();
    combinedBoard();
  }, []);

  const flipAndInvertBoard = (originalBoard: string[][]) => {
    const flippedv = originalBoard.slice().reverse();
    const flippedh = flippedv.map((row) => row.slice().reverse());
    console.log(flippedh);
    return flippedh;
  };
  const handleCellClick = (row: number, col: number) => {
    console.log("player1:", isPlayer1Turn);

    console.log("clicked button", isSelected);
    if (!selectedPiece) {
      const piece = board[row][col];
      console.log("row and col", row, col);
      console.log("board", board[row][col]);

      console.log("piece ", piece, "player1 ", isPlayer1Turn);
      if (piece /*&& currentPlayer*/ && !piece.includes("Flag") && !piece.includes("Bomb")) {
        const currentPlayerNumber = isPlayer1Turn ? "1" : "2";
        if (piece.includes(currentPlayerNumber)) {
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

  const handleGameOver = () => {
    console.clear();
    console.log("navigate away");
    navigate('/gameOver');
    // <Route path="/gameOver"/>
            

          
  }
  const movePiece = async (directionRow: number, directionCol: number) => {
    if (selectedPiece) {
      const { row, col } = selectedPiece;
      const toRow = row + directionRow;
      const toCol = col + directionCol;

      if (isValidMove(row, col, toRow, toCol)) {
        const updatedBoard = [...board];
        if (updatedBoard[toRow][toCol] !== "") {
          console.log("attack");
          const attackingPiece = updatedBoard[row][col];
          const defendingPiece = updatedBoard[toRow][toCol];
          if (isOpponentsPiece(attackingPiece, defendingPiece)) {
            console.clear();
            console.log("attack");
            const attackerWins = compareRanks(attackingPiece, defendingPiece);
            if (attackerWins) {
              updatedBoard[toRow][toCol] = attackingPiece;
              updatedBoard[row][col] = "";
              updateScores("win");
              console.log(
                "win points",
                game.Player1Points,
                ":",
                game.Player2Points
              );
            } else {
              updatedBoard[row][col] = "";
              updateScores("lose");
              console.log(
                "lose points",
                game.Player1Points,
                ":",
                game.Player2Points
              );
            }
          }
        } else {
          updatedBoard[toRow][toCol] = updatedBoard[row][col];
          updatedBoard[row][col] = "";
        }
        // await saveBoardToServer(updatedBoard);
        setSelectedPiece({ row: toRow, col: toCol });
        setGame((prevGame) => ({
          ...prevGame,
          board: updatedBoard,
        }));
        setIsPlayer1Turn(!isPlayer1Turn);
        console.log("players1turn: shoule switch", isPlayer1Turn);
      }
    }
  };

  const isOpponentsPiece = (attacker: string, defender: string): boolean => {
    console.log(attacker);
    console.log(defender);
    const currentPlayerNumber = isPlayer1Turn ? "1" : "2";
    const opponentPlayerNumber = isPlayer1Turn ? "2" : "1";

    return (
      attacker.includes(currentPlayerNumber) &&
      defender.includes(opponentPlayerNumber)
    );
  };
  const compareRanks = (attacker: string, defender: string): boolean => {
    const rankMap: { [key: string]: number } = {
      Scout: 2,
      Miner: 3,
      Spy: 1,
      Bomb: 12,
      Sergeant: 4,
      Lieutenant: 5,
      Captain: 6,
      Major: 7,
      Colonel: 8,
      General: 9,
      Marshal: 10,
      Flag: 0,
    };
    if (attacker.includes("Miner") && defender.includes("Bomb")) {
      return true;
    }
    if (defender.includes("Flag")) {
      setGameOver(true);
      return false;
    }
    return rankMap[attacker] >= rankMap[defender];
  };

  const updateScores = (
    outcome: string /*attackingPiece: string, defendingPiece: string*/
  ) => {
    const currentPlayerNumber = isPlayer1Turn? "1": "2"
    const currentPlayerPieces = board.flat().filter(piece => piece.includes(currentPlayerNumber));
    const onlyFlagAndBombLeft = currentPlayerPieces.every(piece => piece.includes("Flag") || piece.includes("Bomb"));
    if(onlyFlagAndBombLeft){
      console.clear()
      console.log("game over")
      setGameOver(true);
      handleGameOver()
    }
    if (outcome.includes("win")) {
      setGame((prevGame) => ({
        ...prevGame,
        Player1Points: (game.Player1Points += 1),
      }));
    } else if (outcome.includes("tie")) {
      console.log("tied attack");
    } else {
      setGame((prevGame) => ({
        ...prevGame,
        Player2Points: (game.Player2Points += 1),
      }));
    }
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

  const display = () => {
    return (
      <div>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => renderCellButton(rowIndex, colIndex))}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <div className="row">
        <h1 className="col col-7">Game {game.id} in Progress</h1>
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
          {game.Player1} score: {game.Player1Points}
        </h3>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col col-11">{display()}</div>
      </div>
      <div className=" row d-flex justify-content-end">
        <h3>
          {game.Player2} score: {game.Player2Points}
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
