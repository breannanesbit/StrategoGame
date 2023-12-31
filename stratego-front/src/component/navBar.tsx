import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import "../styles/navbar.css";
import { SettingsIcon } from "../styles/images/gear-solid";
import { useMutationPostUserInfo, useUserInforQuery } from "../query/hook";
import { User } from "../models/user";
import { v4 as uuidv4 } from 'uuid';


const Navbar = () => {
  const auth = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const mutateUser = useMutationPostUserInfo();
  const username = auth.user?.profile.preferred_username || '';
  const userInfo = useUserInforQuery(username);

  const LogIn = () => {
    try {
      auth.signinRedirect();
    } catch (e) {
      console.error('Error fetching user information:', e);
    }
  };

  useEffect(() => {
    const addUserOnLogin = async () => {
      console.log(userInfo.data)
      if (auth.isAuthenticated && username && !userInfo.data) {
        const randomUniqueId = uuidv4();
        const user: User = {
          id: randomUniqueId,
          userName: username,
          points: 0,
          gamesPlayed: 0,
          imageBase64: '',
          boards: [],

        };
        await mutateUser.mutate({ user: user });
        console.log("User added successfully");
      }
    };

    addUserOnLogin(); // Trigger on initial mount

    // Set up a listener for changes in auth.isAuthenticated
    const handleAuthChange = () => {
      addUserOnLogin();
    };

    // Attach the event listener
    auth.events.addUserLoaded(handleAuthChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      auth.events.removeUserLoaded(handleAuthChange);
    };
  }, [auth.isAuthenticated, username, userInfo.data, mutateUser, auth.events]);


  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }



  if (auth.isAuthenticated) {
    return (
      <nav
        className={`navbar container-fluid navbar-expand-lg  px-0 ${isMobile ? "mobile" : ""
          }`}
      >
        <div className="navbar-brand col col-12 ">
          <div className="row mx-auto">
            <div className="col col-2">
              <NavLink className="nav-link" to="/">
                <span>Home</span>
              </NavLink>
            </div>
            <div className="col col-2">
              <NavLink className="nav-link" to="/rules">
                <span>Rules</span>
              </NavLink>
            </div>
            <div className="col col-2">
              <NavLink className="nav-link" to="/LeaderBoard">
                <span>LeaderBoard</span>
              </NavLink>
            </div>
            <div className="col col-3">
              <NavLink className="nav-link" to="/acheivements">
                <span>Acheivements</span>
              </NavLink>
            </div>

            <div className="col col-2 text-end mx-2">
              <button
                className="navbutton btn"
                onClick={() => void auth.removeUser()}
              >
                Logout
              </button>
            </div>
            <div className="col col-1">
              <NavLink className="nav-link" to="/settings">
                <span className="icon">
                  <SettingsIcon />
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`navbar container-fluid navbar-expand-lg  px-0 ${isMobile ? "mobile" : ""
        }`}
    >
      <div className="navbar-brand col col-12 ">
        <div className="row mx-auto">
          <div className="col col-2">
            <NavLink className="nav-link" to="/">
              <span>Home</span>
            </NavLink>
          </div>
          <div className="col col-1">
            <NavLink className="nav-link" to="/rules">
              <span>Rules</span>
            </NavLink>
          </div>
          <div className="col col-2">
            <NavLink className="nav-link" to="/LeaderBoard">
              <span>LeaderBoard</span>
            </NavLink>
          </div>
          <div className="col col-2">
            <NavLink className="nav-link" to="/acheivements">
              <span>Acheivements</span>
            </NavLink>
          </div>
          <div className="col col-2 text-end mx-2">
            <button
              className="navbutton btn "
              onClick={() => LogIn()}
            >
              Login
            </button>
          </div>
          <div className="col col-1">
            <NavLink className="nav-link" to="/settings">
              <span className="icon">
                <SettingsIcon />
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
