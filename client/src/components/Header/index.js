import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [isActive, setisActive] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a>
          <Link to="/">
            <img
              src={require("../../assets/images/logo.png")}
              width="112"
              height="28"
            />
          </Link>
        </a>
        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      <div
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
        id="navbarBasicExample"
      >
        <div className="navbar-start">
          <a className="navbar-item">
            <Link to="/">
              <h1>Home</h1>
            </Link>
          </a>
          {Auth.loggedIn() ? (
            <>
              <a className="navbar-item">
                <Link to="/profile">Profile</Link>
              </a>
              <div className="buttons">
                <div className="button is-link is-light">
                  <a href="/" onClick={logout}>
                    Logout
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="navbar-end">
                <div className="buttons">
                  <div className="button is-link is-outlined">
                    <Link to="/login">Login</Link>
                  </div>
                  <div className="button is-link is-light">
                    <Link to="/signup">Signup</Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
