import React from 'react';

const NavBar = (props) => {
  return (
    <header>
      <ul className="nav">
        <li className="nav">
          <a href="/">Home</a>
        </li>
        <li className="nav">
          <a href="/game">New Game</a>
        </li>
        <li className="nav">
          <a href="/score">High Scores</a>
        </li>
        <li className="nav">
          <a href="/info">Info</a>
        </li>
      </ul>
    </header>
  )
}

export default NavBar;
