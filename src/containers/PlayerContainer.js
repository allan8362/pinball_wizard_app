import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PlayerList from '../components/players/PlayerList';
import Request from '../helpers/request';
import PlayerDetail from '../components/players/PlayerDetail';
import PlayerForm from '../components/players/PlayerForm';

class PlayerContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      players: []
    }

    this.findPlayerById = this.findPlayerById.bind(this);

  }

  componentDidMount() {
    const request = new Request();
    request.get('/players')
    .then(data => this.setState({players: data.players}))
  }

  findPlayerById(id){
    return this.state.players.find((player) => {
      return player.id === parseInt(id);
    })
  }

  handlePost(player){
    const request = new Request();
    request.post('/players', player)
    .then(() => {
      window.location = '/game/'
    })
  }

  render() {
    return (
      <Router>
        <React.Fragment>
        <Switch>

          <Route exact path="/players/new" render={(props) => {
            return <PlayerForm onSubmit={this.handlePost}/>
          }} />

          <Route exact path="/players/:id" render={(props) => {
            const id = props.match.params.id;
            const pirate = this.findPlayerById(id);
            return <PlayerDetail pirate={pirate} />
          }} />

          <Route render={(props) => {
            return <PlayerList players={this.state.players} />
          }} />
        </Switch>
        </React.Fragment>
      </Router>
    )
  }
}

export default PlayerContainer;
