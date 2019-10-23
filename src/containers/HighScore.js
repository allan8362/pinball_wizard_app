import React, {Component} from 'react';
import HighScoreList from "../components/HighScoreList";

class HighScore extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [
        { id: 1,
          name: "Kev",
          score: 1100
        },
        { id: 2,
          name: "Allan",
          score: 850
        },
        { id: 3,
          name: "Tommy",
          score: 12000
        },
        { id: 4,
          name: "Sally",
          score: 500
        },
        { id: 5,
          name: "Acid Queen",
          score: 300
        },
      ]
    }
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
