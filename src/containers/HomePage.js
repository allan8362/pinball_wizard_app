import React, {Component, Fragment} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from '../NavBar.js';
import GameTable from './GameTable';
import InfoPage from '../components/InfoPage';
import '../css/styles.css';

class HomePage extends Component {

  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
          <p>Welcome to PinBall Wizard!</p>
          <p>Can you play a mean pinball?</p>
          <p>Controls: </p>
          <ul>
          <li>Launch Ball: Space Bar</li>
          <li>Left Flipper: Left Arrow Key</li>
          <li>Right Flipper: Right Arrow Key</li>
          </ul>
            <Switch>
              <Route path="/info" component={InfoPage} />
              <Route path="/game" component={GameTable} />
            </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default HomePage;
