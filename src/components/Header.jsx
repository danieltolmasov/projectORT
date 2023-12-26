import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import UserContext from "../data/UserContext";
import "../style/Header.css"
export default function Header() {
  const { user, setUser } = useContext(UserContext);

  const signOut = () => {
    setUser(null);
  };

  return (

    <nav
    dir="rtl"
    className="navbar navbar-expand-lg "
    style={{
      background: "#373737",
      height: "70px",
      width: "100%",
      position: "relative",
      zIndex: "1"
    }}
  >
    <img
      className="imgHeader img-fluid"
      src={logo}
      style={{
        height: "60px",
        width: "210px",
      }}
    />
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
      
    >
      <span className="navbar-toggler-icon"></span>
    </button>

      <div className=" navbar-collapse" id="navbarNav">
        <ul className=" navbar-nav ml-auto mx-5">
          <li className="nav-item mx-5">
            <Link className="nav-link link-secondary fs-6 text " to="/">
              דף הבית
            </Link>
          </li>
          <li className="nav-item mx-5">
            <Link className="nav-link link-secondary fs-6 text" to="/Lawyers">
              עורכי דין
            </Link>
          </li>
          <li className="nav-item mx-5">
            <Link
              className="nav-link link-secondary fs-6 text "
              to="/AddLawyer"
            >
              הוספת עורך דין
            </Link>
          </li>
          <li className="nav-item active mx-5">
            <Link className="nav-link link-secondary fs-6 text" to="/Questions">
              צאט לשאלות
            </Link>
          </li>
          <li className="nav-item mx-5">
            <Link
              className="nav-link link-secondary fs-6 text"
              to="/Information"
            >
              מידע
            </Link>
          </li>
          <li
            className="nav-item"
  
          >
            {user ? (
              <p
                className="nav-link link-secondary fs-6 text"
                onClick={signOut}
              >
                התנתקות
              </p>
            ) : (
              <Link className="nav-link link-secondary fs-6 text" to="/SignUp">
                התחברות/הרשמה
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
    
  );
}