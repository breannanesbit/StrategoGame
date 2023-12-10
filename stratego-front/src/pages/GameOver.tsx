import React, { useCallback, useContext, useEffect, useState } from "react";
import "../styles/gameover.css";
import { Game } from "../models/game";
import { GameContext } from "../context/gameContext";

// const initialBoardState: string[][] = [
//   ["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["Scout","Scout","Scout","Scout","Scout","Bomb","Bomb","Bomb","Bomb","Bomb",],["Scout", "Scout", "Scout", "Miner", "Miner", "", "", "", "", ""],["", "", "", "", "Miner", "Bomb", "Spy", "", "", ""],["", "", "", "", "", "", "", "", "", "Flag"],
// ];
// const initialPlayers: Game[] = [
//   { id: "1", Player1: "Player1", Player2: "Player2",Player1Points: 50, Player2Points:100 ,board: initialBoardState },
//   // { id: "2", userName: "Player2", points: 500, board: initialBoardState , gamesPlayed: 0},
// ];

export const GameOver = () => {
  const{game} = useContext(GameContext);
  const {Player1, Player1Points, Player2, Player2Points} = game;
  const [winningPlayer, setWinningPlayer] = useState<number | null>(null);

  const whoWins = useCallback(() => {
    if(game.Player1Points
      > game.Player2Points){
      console.log("player1 wins")
      setWinningPlayer(1)}
    else if(game.Player1Points < game.Player2Points){
      console.log("player 2 wins");
      setWinningPlayer(0)}
    else{
      console.log("both groups win")}
      setWinningPlayer(null);
  },[])
  useEffect (()=> {
    whoWins();
  }, [winningPlayer,whoWins])

  const getBackgroundColor = () => {
    return winningPlayer ? (winningPlayer === 1 ? "bg-image-red" : "bg-image-blue") : "bg-image-purple";
  }
    
  return (
    <div className={getBackgroundColor()}>
      <h1 className="text-center ">Game Over</h1>
      <div className="container-fluid d-flex justify-content-center align-items-center max-height">
        <div className="col col-7">
          {winningPlayer !== null ? (
          <h2 className="text-center ">{winningPlayer ? "Red Wins!" : "Blue Wins!" }</h2>
          ):(
            <h2 className="text-center">It's a Tie!</h2>
          )}
          <div className="row">
            <div className="col col-6 d-flex justify-content-end">
              <h3>Red points: </h3>
            </div>
            <div className="col col-6">
              <h3>{game.Player1Points}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col col-6 d-flex justify-content-end">
              <h3>Blue points:</h3>
            </div>
            <div className="col col-6">
              <h3>{game.Player2Points}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
