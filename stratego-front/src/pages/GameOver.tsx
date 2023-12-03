// import { useEffect, useState } from "react";
import { useCallback, useEffect, useState } from "react";
//import { User } from "../models/user";
import "../styles/gameover.css";
import { Game } from "../models/game";
// import { Link } from 'react-router-dom';
// import keycloak from "../component/keycloak";

const initialBoardState: string[][] = [
  ["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["Scout","Scout","Scout","Scout","Scout","Bomb","Bomb","Bomb","Bomb","Bomb",],["Scout", "Scout", "Scout", "Miner", "Miner", "", "", "", "", ""],["", "", "", "", "Miner", "Bomb", "Spy", "", "", ""],["", "", "", "", "", "", "", "", "", "Flag"],
];
const initialPlayers: Game[] = [
  { id: "1", Player1: "Player1", Player2: "Player2",Player1Points: 0, Player2Points:0 ,board: initialBoardState },
  // { id: "2", userName: "Player2", points: 500, board: initialBoardState , gamesPlayed: 0},
];
export const GameOver = () => {
  const [players, _setPlayers] = useState<Game[]>(initialPlayers);
  const [winningPlayer, setWinningPlayer] = useState(true);

  const whoWins = useCallback(() => {
    if(players[0].Player1Points > players[1].Player2Points)
      setWinningPlayer(true)
    if(players[0].Player1Points < players[1].Player2Points)
      setWinningPlayer(false)
    else
      console.log("both groups win")

  },[players])
  useEffect (()=> {
    whoWins();
  }, [players,winningPlayer,whoWins])

  

  const getBackgroundColor = () => {
    return winningPlayer ? "bg-image-red" : "bg-image-blue";
  }
    


  return (
    <div className={getBackgroundColor()}>
      <h1 className="text-center ">Game Over</h1>
      <div className="container-fluid d-flex justify-content-center align-items-center max-height">
        <div className="col col-7">
          <h2 className="text-center ">{winningPlayer ? "Red Wins!" : "Blue Wins!" }</h2>
          <div className="row">
            <div className="col col-6 d-flex justify-content-end">
              <h3>Red points: </h3>
            </div>
            <div className="col col-6">
              <h3>{players[0].Player1Points}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col col-6 d-flex justify-content-end">
              <h3>Blue points:</h3>
            </div>
            <div className="col col-6">
              <h3>{players[1].Player2Points}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
