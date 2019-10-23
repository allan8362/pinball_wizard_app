import React from 'react';
import Player from './Player.js';


const PlayerList = (props) => {

	const players = props.players.map((player, index) => {
		return (
			<li key={index} className="component-item">
				<div className="component">
					<Player player={player} />
				</div>
			</li>
		)
	})


	return (
		<ul className="component-list">
			{players}
		</ul>

	)
}
 export default PlayerList;
