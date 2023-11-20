

interface Player {
    name: string;
    scoredValue: number;
}
interface LeaderBoardProps {
    players: Player[];
    headerName: string;
}

export const GenericLeaderBoard: React.FC<LeaderBoardProps> = ({players, headerName}) => {
    const sortedLeaderboard = [...players].sort((a,b) => b.scoredValue - a.scoredValue);

  return (
    <div>
      <div className="container mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Place</th>
              <th scope="col">Name</th>
              <th scope="col">{headerName}</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaderboard.map((player,index) => (
            <tr key={index + 1}>
              <th scope="row">{index + 1}</th>
              <td>{player.name}</td>
              <td>{player.scoredValue}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};