import React, { useEffect, useState } from "react";
import { GenericLeaderBoard } from "../component/GenericLeaderBoard";
import "../styles/leaderboard.css";
import { User } from "../models/user";

interface Player {
  name: string;
  scoredValue: number;
}
export const examplePointsList: Player[] = [
  { name: "User1", scoredValue: 10 },
  { name: "User2", scoredValue: 15 },
  { name: "User3", scoredValue: 8 },
  { name: "User4", scoredValue: 20 },
  { name: "User5", scoredValue: 12 },
  { name: "User6", scoredValue: 18 },
  { name: "User7", scoredValue: 14 },
  { name: "User8", scoredValue: 25 },
  { name: "User9", scoredValue: 22 },
  { name: "User10", scoredValue: 30 },
  { name: "User11", scoredValue: 28 },
  { name: "User12", scoredValue: 16 },
];
export const exampleGamesList = [
  { name: "User1", scoredValue: 5 },
  { name: "User2", scoredValue: 8 },
  { name: "User3", scoredValue: 12 },
  { name: "User4", scoredValue: 10 },
  { name: "User5", scoredValue: 15 },
  { name: "User6", scoredValue: 20 },
  { name: "User7", scoredValue: 25 },
  { name: "User8", scoredValue: 18 },
  { name: "User9", scoredValue: 30 },
  { name: "User10", scoredValue: 22 },
  { name: "User11", scoredValue: 14 },
  { name: "User12", scoredValue: 16 },
];

const LeaderBoard: React.FC = () => {
  const [_users, _setUsers] = useState<User[]>([]);
  const [pointsList, setPointsList] = useState<Player[]>([]);
  const [gamesList, setGamesList] = useState<Player[]>([]);

  useEffect(() => {
    // try {
    //   axios.get("api/users").then((response) => {
    //     const userList: User[] = response.data;
    //     setUsers(userList);

    //     const pointsData: Player[] = userList.map((user) => ({
    //       name: user.userName,
    //       scoredValue: user.points || 0,
    //     }));
    //     setPointsList(pointsData);

    //     const gamesData: Player[] = userList.map((user) => ({
    //       name: user.userName,
    //       scoredValue: user.gamesPlayed || 0,
    //     }));
    //     setGamesList(gamesData);
    //   });
    // } catch (error) {
    //   console.log("Couldn't get players", error);
    // }
    setPointsList(examplePointsList);
    setGamesList(exampleGamesList);
  }, []);

  return (
    <div>
      <h2 className="text-start mx-5 pt-5"> Global Leaderboard For Points</h2>
      <div className="scrollable-leaderboard">
        <GenericLeaderBoard players={pointsList} headerName="Points" />
      </div>

      <h2 className="text-start mx-5 pt-5">
        Global Leaderboard For Games Played
      </h2>
      <div className="scrollable-leaderboard">
        <GenericLeaderBoard players={gamesList} headerName="Games" />
      </div>
    </div>
  );
};

export default LeaderBoard;
