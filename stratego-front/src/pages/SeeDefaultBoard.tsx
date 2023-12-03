import React from "react";
import { Link } from "react-router-dom";
import { useUserBoardsQuery } from "../query/hook";
import { useAuth } from "react-oidc-context";

export const SeeDefaultBoard = () => {
  const auth = useAuth();
  const user = auth.user?.profile.sub || '';

  // Destructure the query result and handle loading and error states
  const { data: userBoards, isLoading, isError } = useUserBoardsQuery(user);

  return (
    <div>
      <h1>User Boards:</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading user boards.</p>}

      {userBoards &&
        userBoards.map((board: any) => (
          <div key={board.name}>
            <h2>{board.name}</h2>
            <pre>{JSON.stringify(board.data, null, 2)}</pre>
          </div>
        ))}

      <button className="btn btn-primary">
        <Link to="/newDefaultBoard">Add new board</Link>
      </button>
    </div>
  );
};
