import "../styles/homepage.css";

export const HomePage = () => {
  return (
    <div className="bg-image">
        <button className="btn btn-outline-danger m-2">Rules</button>
      <div className="container-fluid d-flex justify-content-center align-items-center max-height">
        <div className="col col-7">
        <div className="row">
          <div className="col col-6 d-flex justify-content-end">
            <button className="btn btn-outline-danger mx-5 ">Start Game</button>
          </div>
          <div className="col col-6">
            <button className="btn btn-outline-danger mx-5">Join Game</button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
