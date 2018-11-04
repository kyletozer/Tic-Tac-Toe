import React, { Component } from 'react';

export default class InfoScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      friend: false,
      human: 'x'
    }

    this.setPlayers = this.setPlayers.bind(this)
  }

  setPlayers(field, event) {
    const newState = {}
    
    if(field === 'friend') {
      newState[field] = !this.state.friend
    } else {
      newState[field] = event.target.value
    }

    this.setState(newState)
  }

  render() {
    const { childStyle, message, startGame } = this.props
    const { friend, human } = this.state

    return (
      <div style={childStyle} className="overlay">
        
        { message && <div className="winner">
          { message }
        </div> }
        
        <h2 className="heading">Tic Tac Toe</h2>

        <form id="set-players" onSubmit={startGame.bind(null, this.state)}>
          
          <div className="form-group opponent" style={{ display: 'none'}}>
            <legend>Choose your opponent</legend>
            <label htmlFor="opponent-computer">
              <input id="opponent-computer" type="radio" name="opponent" value="computer" checked={!friend ? 'checked' : ''} onChange={this.setPlayers.bind(this, 'friend')} />
              <div></div>
              <i className="fas fa-desktop"></i>
            </label>
            <label htmlFor="opponent-friend">
              <input id="opponent-friend" type="radio" name="opponent" value="friend" checked={friend ? 'checked' : ''} onChange={this.setPlayers.bind(this, 'friend')} />
              <div></div>
              <i className="fas fa-user"></i>
            </label>
          </div>

          <div className="form-group team">
            <legend>Choose your side</legend>
            <label htmlFor="team-x">
              <input id="team-x" type="radio" name="team" value="x" checked={human === 'x' ? 'checked' : ''} onChange={this.setPlayers.bind(this, 'human')} />
              <div></div>
              <i className="fas fa-times"></i>
            </label>
            <label htmlFor="team-o">
              <input id="team-o" type="radio" name="team" value="o" checked={human === 'o' ? 'checked' : ''} onChange={this.setPlayers.bind(this, 'human')} />
              <div></div>
              <i className="far fa-circle"></i>
            </label>
          </div>

          <button className="button" type="submit">Start Game</button>
        </form>
      </div>
    )
  }
}