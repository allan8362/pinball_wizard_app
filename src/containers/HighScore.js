import React, {Component} from 'react';
import HighScoreList from "../components/HighScoreList";
import Request from '../helpers/request';

class HighScore extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const request = new Request();
    request.get('/players')
    .then((data) => {this.setState({data: data})})
  }

  render(){
    return (
      <div className="highScoreTable">
        <h1>High Scores!</h1>
        <br/>
        <HighScoreList data={this.state.data} />
      </div>
    );
  }
}

export default HighScore;
