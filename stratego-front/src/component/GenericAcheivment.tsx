import React from "react";
import "../styles/acheivements.css";


interface Acheivements {
  title: string;
  description: string;
  conditionVariable: string; // games, points
  conditionValue: number; //how many games, points
}

interface AcheivementsProps {
  acheivements: Acheivements[];
  playerPoints: number;
  playerGamesPlayed: number;
}
export const GenericAcheivements: React.FC<AcheivementsProps> = ({
  acheivements,
  playerPoints,
  playerGamesPlayed,
}) => {
  // const sortedLeaderboard = [...players].sort((a,b) => b.scoredValue - a.scoredValue);
  const isValidAchievements =
    Array.isArray(acheivements) && acheivements.length > 0;
  return (
    <div>
      {isValidAchievements ? (
        <div className="container mt-4">
          <div className="row">
            {acheivements.map((achievement, index) => (
              <div key={index} className={`col card col-12 mb-4 ${
                (achievement.conditionVariable === "points" &&
            playerPoints >= achievement.conditionValue) ||
        (achievement.conditionVariable ==="gamesPlayed" && playerGamesPlayed >= achievement.conditionValue)
    ? "card-not-valid": "card-valid" }`}>
                  <div className="card-body">
                    <div className="card-title row">
                      <h5 className="col-9 text-center">{achievement.title}</h5>
                      <div className="col-3 px-5">
                        {achievement.conditionVariable}:{" "}
                        {achievement.conditionValue}
                      </div>
                    </div>
                    <p className="card-text">{achievement.description}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <h5> No Achievements</h5>
        </div>
      )}
    </div>
  );
};
