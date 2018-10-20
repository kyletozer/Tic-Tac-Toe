import React, { Component } from 'react';
import Square from './components/Square'
import InfoScreen from './components/InfoScreen'

export default class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      turn: 0,
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
    const board = []

    for(let i = 0; i < 9; i++) {
      board.push(<Square key={i}></Square>)
    }

    return (
      <div className="App">
        <div id="board">
          {(!this.state.com || !this.state.human) && <InfoScreen setPlayers={this.setPlayers}/>}
          <div className="wrap">
           { board }
          </div>
        </div>
      </div>
    );
  }
}