import React, {Component} from "react";
import HighScoreItem from "./HighScoreItem";

class HighScoreList extends Component {

  render(){
    const scoreItems = this.props.data.map( score =>{
      return(
        <HighScoreItem key={score.id} name={score.name} score={score.score}></HighScoreItem>
      )
    })
    return(
      <div>
        {scoreItems}
      </div>
    );
  };

}

export default HighScoreList;
