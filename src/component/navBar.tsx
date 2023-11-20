import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import keycloak from "./keycloak";

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    useEffect(() => {
      checkIsMobile();

      const updateLoginStatus = () => {
        setIsLoggedIn(keycloak.authenticated);
        console.log(isLoggedIn)
      };

      keycloak.onAuthSuccess = updateLoginStatus;
      keycloak.onAuthError = updateLoginStatus;
      keycloak.onAuthRefreshSuccess = updateLoginStatus;
      keycloak.onAuthRefreshError = updateLoginStatus;
      keycloak.onAuthLogout = updateLoginStatus;

      window.addEventListener("resize", checkIsMobile);
  

      return () => {
        window.removeEventListener("resize", checkIsMobile);
      };
    }, [isLoggedIn]);

    const login = () => {
      keycloak.login();
     
    };
  
    const logout = () => {
      keycloak.logout();
    };
  
    return (
      <nav className={`navbar container-fluid navbar-expand-lg  px-0 ${isMobile ? "mobile" : ""}`}>
        <div className="navbar-brand col col-12 ">
          <div className="row mx-auto">
            <div className="col col-2">
              <NavLink className ="nav-link" to="/">
                <span>Home</span>
              </NavLink>
            </div>
            <div className="col col-2">
              <NavLink className ="nav-link" to="/rules">
                <span>Rules</span>
              </NavLink>
            </div>
            <div className="col col-2">
              <NavLink className="nav-link" to="/LeaderBoard">
              <span>LeaderBoard</span>
              </NavLink>
            </div>
            <div className="col col-3"></div>
            <div className="col col-2 text-end mx-2">
              
              
              {!isLoggedIn && <button className="navbutton btn " onClick={login}>Login</button>}
              {isLoggedIn && <button className="navbutton" onClick={logout}>Logout</button>} 

            
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  