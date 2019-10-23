import React, {Component, Fragment} from "react";

class HighScoreItem extends Component {
  render(){
    return(
      <Fragment>
        <tr>
        <td>{this.props.position}</td>
        <td>{this.props.name}</td>
        <td>{this.props.score}</td>
        </tr>
      </Fragment>
    )
  }
}

export default HighScoreItem;
