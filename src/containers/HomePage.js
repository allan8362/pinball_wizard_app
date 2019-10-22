import React, {Component, Fragment} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import GameTable from './GameTable';

class HomePage extends Component {
  render() {
    return (
      <Router>
      <Fragment>
      <Switch>
        <Route exact path="/game" component={GameTable} />
      </Switch>
      <p>Welcome to PinBall Wizard!</p>
      <p>Can you play a mean pinball?</p>
      <button><Link to="/game">New Game</Link></button>
      </Fragment>
      </Router>
    );
  }
  }

export default HomePage;
