import React from 'react';
import {render} from 'react-dom';
import GameTable from './containers/GameTable';

const App = () => (
  <div>
    <GameTable />
  </div>
);

render (<App />, document.getElementById('root'));

export default App;
