import React from "react";
import { Link } from "react-router-dom";
import { useUserInforQuery } from "../query/hook";
import { useAuth } from "react-oidc-context";

export const SeeDefaultBoard = () => {
    const auth = useAuth();
    const user = auth.user?.profile.preferred_username || '';

    // Destructure the query result and handle loading and error states
    const { data: userBoards, isLoading, isError } = useUserInforQuery(user);

    return (
        <div>
            <h1>User Boards:</h1>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading user boards.</p>}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                {userBoards &&
                    userBoards.boards.map((board: any) => (
                        <div key={board.id} className="col mb-4">
                            <div className="card" style={{backgroundColor: 'rgb(54, 30, 85)', color: 'white'}}>
                                <div className="card-body">
                                    <h5 className="card-title">{board.title}</h5>
                                    <pre className="card-text">{JSON.stringify(board.data, null, 2)}</pre>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <button className="btn btn-primary">
                <Link to="/newDefaultBoard">Add new board</Link>
            </button>
        </div>
    );
};
