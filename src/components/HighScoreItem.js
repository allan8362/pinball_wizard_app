import React, {Component} from "react";

class HighScoreItem extends Component{
  render(){
    return(
      <div className="scoreItem">
        <h4>{this.props.name}</h4>
        <p>{this.props.score}</p>
      </div>
    )
  }
}

export default HighScoreItem;
