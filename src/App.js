import React, { Component } from 'react';
import Square from './components/Square'
import InfoScreen from './components/InfoScreen'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      turn: 0
    }
  }
  
  render() {
    const board = []

    for(let i = 0; i < 9; i++) {
      board.push(<Square key={i}></Square>)
    }

    return (
      <div className="App">
        <div id="board">
          {this.state.turn === 0 && <InfoScreen/>}
          <div className="wrap">
           { board }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
