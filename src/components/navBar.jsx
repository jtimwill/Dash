import React from 'react';

const NavBar = () => {
  return (
    <header>
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          <img
            src="logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top mx-1"
            alt=""
          >
          </img>
          Dashboard
        </a>
      </nav>
    </header>
  );
};

export default NavBar;
