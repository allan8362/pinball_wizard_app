import React, {Component, Fragment} from 'react';
import HomePage from './containers/HomePage';
import './css/styles.css';

import PlayerContainer from './containers/PlayerContainer';

class App extends Component {
  render() {
    return (
      <Fragment>
        <HomePage />
        <PlayerContainer />
      </Fragment>
    );
  }
}

export default App;
