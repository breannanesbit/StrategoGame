import "../styles/homepage.css";
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="bg-image">
      <button className="btn btn-outline-danger m-2">
        <Link style={{ textDecoration: 'none', color: 'red' }} to={'/rules'}>Rules</Link>
      </button>
      <h1 className="text-center">Welcome to Stratego</h1>
      <div className="container-fluid d-flex justify-content-center align-items-center max-height">
        <div className="col col-7">
          <div className="row">
            <div className="col col-6 d-flex justify-content-end">
              <button className="btn btn-outline-danger mx-5 ">          
              <Link style={{ textDecoration: 'none', color: 'red' }} to={'/buildborad'}>Play</Link>
              </button>
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
