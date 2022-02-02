import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="navbar-menu" id="navbarBasicExample" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
          <a>
            <Link to="/">
              <img src={require("../../assets/images/logo.png")} width="112" height="28" />
            </Link>
          </a>
        <div className='navbar-start'>
            <a className='navbar-item'>
                <Link to="/">
                    <h1>Home</h1>
                </Link>
            </a>
        {Auth.loggedIn() ? (
            <>
            <a className='navbar-item'>
                <Link to="/profile">Profile</Link>
            </a>
            <div className='buttons'>
                <div className='button is-link is-light'>
                    <a href="/" onClick={logout}>Logout</a>
                </div>
            </div>
            </>
        ) : (
            <>
            <div className='navbar-end'>
                <div className='buttons'>
                    <div className='button is-link is-outlined'>
                        <Link to="/login">Login</Link>
                    </div>
                    <div className='button is-link is-light'>
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
