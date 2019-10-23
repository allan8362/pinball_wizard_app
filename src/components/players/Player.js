import React  from 'react';
import {Link} from 'react-router-dom';

const Player = (props) => {
  const url = "/players/" + props.player.id;

  return (
    <React.Fragment >
      <Link to={url} className="name">
      {props.player.name}
      </Link>
      <p>Score: {props.player.score}</p>
    </React.Fragment>
  )
}

export default Player;
