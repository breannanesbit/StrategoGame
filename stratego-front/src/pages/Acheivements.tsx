import React, { useEffect, useState } from "react";
import { GenericAcheivements } from "../component/GenericAcheivment";
import { User } from "../models/user";

interface Acheivements {
  title: string;
  description: string;
  conditionVariable: string; // games, points
  conditionValue: number; //how many games, points
}
export const examplePlayerList: User[] = [
  {id: "0" ,userName: "toby", points: 50, gamesPlayed: 50},
];
export const exampleAcheivmentList = [
  { title: "acheivment 1", description: "description of acheivement 1", conditionVariable: "points", conditionValue: 5 },
  { title: "acheivment 2", description: "description of acheivement 2", conditionVariable: "points", conditionValue: 50 },
  { title: "acheivment 3", description: "description of acheivement 3", conditionVariable: "points", conditionValue: 75 },
  { title: "acheivment 4", description: "description of acheivement 4", conditionVariable: "gamesPlayed", conditionValue: 5 },
  { title: "acheivment 5", description: "description of acheivement 5", conditionVariable: "gamesPlayed", conditionValue: 50 },
  { title: "acheivment 6", description: "description of acheivement 6", conditionVariable: "gamesPlayed", conditionValue: 75 },
];

export const Acheivements = () => {
  const [_user, _setUser] = useState<User>(examplePlayerList[0]);
  const [acheivementsList, setAcheivementsList] = useState<Acheivements[]>([]);

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
    setAcheivementsList(exampleAcheivmentList);
  }, []);

  return (
    <div>
      <h2 className="text-start mx-5 pt-5"> Acheivements:</h2>
      <div className="col col-12">
        <GenericAcheivements acheivements={acheivementsList} playerPoints= {_user.points} playerGamesPlayed={_user.gamesPlayed} />
      </div>

    </div>
  );
};

