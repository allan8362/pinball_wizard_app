import React, {Component} from "react";
import HighScoreItem from "./HighScoreItem";

class HighScoreList extends Component {

  render(){
    const scoreItems = this.props.data.map( score =>{
      return(
        <HighScoreItem key={score.id}
        position={score.id} name={score.name} score={score.score}></HighScoreItem>
      )
    })
    return(
      <div>
        <table>
          <thead>
            <tr>
              <td scope="col">Position</td>
              <td scope="col">Player</td>
              <td scope="col">Score</td>
            </tr>
          </thead>
          <tbody>
            {scoreItems}
          </tbody>
        </table>
      </div>
    );
  };

}

export default HighScoreList;
