import React from 'react';
import Player from './Player.js';

const PlayerDetail = (props) => {
  if(!props.player) {
    return "Loading...";
  }

  return (
    <div className="component">
      <Player player={props.player} />
      <p>Name: </p>
      <p>{props.player.name}</p>
      <p>Score: </p>
      <p>{props.player.score}</p>
    </div>
  )
}

export default PlayerDetail;
