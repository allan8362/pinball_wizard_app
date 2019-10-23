import React, {Component} from 'react';
import Request from '../../helpers/request'

class PlayerFormContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      score: 0,
    }

    this.handleName = this.handleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const request = new Request();
    request.get('/players').then((data) => {
      this.setState({scores: data.players})
    })
  }

  handleName(event){
    this.setState({name: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
    const newPlayer = {
      name: this.state.name,
      joinDate: new Date()
    }

    this.props.onSubmit(newPlayer)
  }

  render(){

    if (this.state.players.length === 0){
      return <p>Loading...</p>
    }

    const playerOptions = this.state.players.map((player, index) => {
      return <option key={index} value={player._links.self.href}>{player.name}</option>
    })



    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Name" name="name" onChange={this.handlename} value={this.state.name} />
      <button type="submit">Save</button>
      </form>
      </div>
    )
  }
}
export default PlayerFormContainer;
