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
      <p>Controls: </p>
      <ul>
      <li>Launch Ball: Space Bar</li>
      <li>Left Flipper: Left Arrow Key</li>
      <li>Right Flipper: Right Arrow Key</li>
      </ul>
      <button><Link to="/game">New Game</Link></button>
      </Fragment>
      </Router>
    );
  }
  }

export default HomePage;
