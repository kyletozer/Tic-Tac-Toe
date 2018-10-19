import React, { Component } from 'react';

export default class InfoScreen extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      human: null,
      com: null
    }
    
    this.setPlayers = this.setPlayers.bind(this)
  }

  setPlayers(event) {
    const human = event.target.textContent.toLowerCase()
    const com = human === 'x' ? 'o' : 'x'
    this.setState({ human, com })
  }

  render() {
    return (
      <div className="overlay">
        <h2>Choose a side</h2>
        <div className="choose-team" onClick={this.setPlayers}>
          <div className="side-x">X</div>
          <div className="side-o">O</div>
        </div>
      </div>
    )
  }
}