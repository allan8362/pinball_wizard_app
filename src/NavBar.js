import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
  return (
    <header>
      <ul className="nav">
        <li className="navLink">
          <a href="/">Home</a>
        </li>
        <li className="navLink">
          <a href="/game">New Game</a>
        </li>
      </ul>
    </header>
  )
}

export default NavBar;
