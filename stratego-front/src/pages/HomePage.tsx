import { useEffect, useState } from "react";
import "../styles/homepage.css";
import { Link } from 'react-router-dom';
import keycloak from "../component/keycloak";

export const HomePage = () => {
  const [username, setUsername] = useState<string | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        //const userProfile = await keycloak.loadUserProfile();
        const username = keycloak.tokenParsed?.preferred_username;
        setUsername(username);
        setLoading(false);
      } catch (error) {
        console.error('Error loading user profile', error);
        setLoading(false);
      }
    };

    const updateLoginStatus = () => {
      if (keycloak.authenticated) {
        loadUserProfile();
      } else {
        setUsername(null);
        setLoading(false);
      }
    };

    keycloak.onAuthLogout = () => {
      updateLoginStatus();
      window.location.href = '/';
    } ;

    updateLoginStatus();


    return () => {
      keycloak.onAuthLogout = undefined;
    };
  }, []);

    


  return (
    <div className="bg-image">
      <h1 className="text-center py-5">Welcome {loading ? 'Loading...' : username || 'Guest'} to Stratego</h1>
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
