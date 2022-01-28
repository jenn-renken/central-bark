import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
          <a className='navbar-item'>
              <img src={require("../../assets/images/logo.png")} />
          </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
        <div id="navbarBasicExample" className='navbar-menu'>
            <div className='navbar-start'>
                <a className='navbar-item'>
                    <Link to="/">
                        <h1>CentralBark</h1>
                    </Link>
                </a>
            </div>
        </div>

            <div className='navbar-item'>
                
                        {Auth.loggedIn() ? (
                            <>
                            <div className='navbar-item'>
                                <Link to="/profile">Profile</Link>
                            </div>
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
                                    <div className='button is-primary'>
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
