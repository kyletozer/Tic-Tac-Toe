import React, { Component } from 'react';
import Square from './components/Square'

class App extends Component {
  
  render() {
    const board = <Square></Square>
    return (
      <div className="App">
        <div id="board">
          { board }
        </div>
      </div>
    );
  }
}

export default App;
