import React, {
  Dispatch,
  SetStateAction,
  ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";
import { Game } from "../models/game";

export interface GameContextType {
  game: Game;
  isPlayer1Turn: boolean;
  player1board: string[][],
  player2board: string[][],
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  setIsPlayer1Turn: React.Dispatch<React.SetStateAction<boolean>>;
}
const emptyBoard: string[][] = [
    ["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["", "", "", "", "", "", "", "", "", ""],["Scout","Scout","Scout","Scout","Scout","Bomb","Bomb","Bomb","Bomb","Bomb",],["Scout", "Scout", "Scout", "Miner", "Miner", "", "", "", "", ""],["", "", "", "", "Miner", "Bomb", "Spy", "", "", ""],["", "", "", "", "", "", "", "", "", "Flag"],
];


const defaultGame: Game = {
  id: "",
  Player1: "",
  Player2: "",
  Player1Points: 0,
  Player2Points: 0,
  board: [],
};

export const GameContext = React.createContext<GameContextType>({
  game: defaultGame,
  isPlayer1Turn: true,
  player1board: [],
  player2board: [],
  setGame: () => {},
  setIsPlayer1Turn: () => {},
});

export const useGameContext = () => {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be within game provider");
  }
  return context;
};

export const GameProvider: React.FC<{
  children: ReactNode;
  initialGame?: Game;
  player1board?: string[][] | undefined;
  player2board?: string[][] | undefined;
  initialIsPlayer1Turn?: boolean;
}> = ({ children, initialGame = defaultGame, player1board, player2board, initialIsPlayer1Turn = true }) => {
    
  const [game, setGame] = React.useState(initialGame);
  const [isPlayer1Turn, setIsPlayer1Turn] =
    React.useState(initialIsPlayer1Turn);


  const value: GameContextType = {
    game,
    isPlayer1Turn,
    player1board: player1board || emptyBoard,
    player2board: player2board || emptyBoard,
    setGame,
    setIsPlayer1Turn,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
