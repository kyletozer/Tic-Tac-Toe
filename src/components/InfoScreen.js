import React, { Component } from 'react';

export default class InfoScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      friend: false,
      human: null
    }
  }

  setPlayers() {
    
  }

  render() {
    const { childStyle, message, startGame } = this.props

    return (
      <div style={childStyle} className="overlay">
        { message && <div className="winner">
          "{ message }"
        </div> }
        <h2>Choose a side</h2>
        <div className="choose-team" onClick={startGame}>
          <div className="side-x">X</div>
          <div className="side-o">O</div>
        </div>
      </div>
    )
  }
}