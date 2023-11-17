import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
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
            <div className="col col-5"></div>
            <div className="col col-2 text-end mx-2">
              <NavLink className ="nav-link"  to="/">
                <span>login</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  