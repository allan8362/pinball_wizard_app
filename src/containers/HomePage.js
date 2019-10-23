import React, {Component, Fragment} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from '../NavBar.js';
import GameTable from './GameTable';
import InfoPage from '../components/InfoPage';
import HighScore from './HighScore';
import '../css/styles.css';

class HomePage extends Component {

  render() {
    return (
      <Router>
        <Fragment>
          <NavBar />
            <Switch>
              <Route path="/info" component={InfoPage} />
              <Route path="/score" component={HighScore} />
              <Route path="/game" component={GameTable} />
            </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default HomePage;
