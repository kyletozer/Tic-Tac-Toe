import React, { Component } from 'react';
import Square from './components/Square'
import InfoScreen from './components/InfoScreen'

export default class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      turn: 1,
      human: null,
      com: null,
      spaces: [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
      xScore: [],
      oScore: [],
      winSequences: [
        [ 0, 1, 2 ],
        [ 3, 4, 5 ],
        [ 6, 7, 8 ],
        [ 0, 3, 6 ],
        [ 1, 4, 7 ],
        [ 2, 5, 8 ],
        [ 0, 4, 8 ],
        [ 2, 4, 6 ]
      ]
    }
  
    this.setPlayers = this.setPlayers.bind(this)
    this.placeMarker = this.placeMarker.bind(this)
  }

  getScoreUpdateKey(inverse = false) {
    const { turn } = this.state
    let cond = inverse ? turn % 2 === 0 : turn % 2 !== 0
    return (cond ? 'x' : 'o') + 'Score'
  }

  placeMarker(squareId = null) {
    const { spaces, turn } = this.state

    // no id indicates computer move
    if(typeof squareId === 'object') {
      squareId = this.getNextMove()
    }

    const spaceIndex = spaces.indexOf(squareId)
    const newState = {}

    // determine which score to update
    const scoreToUpdate = this.getScoreUpdateKey()

    // if the space is no longer available, do nothing
    if(spaceIndex === -1) return

    // check for game winning sequence
    if(turn > 4 && this.checkForWinner()) {
      this.endGame()
      return
    }
    // update the available spaces on the board
    newState.spaces = spaces.slice()
    newState.spaces.splice(spaceIndex, 1)

    // update score
    newState[scoreToUpdate] = this.state[scoreToUpdate].slice()
    newState[scoreToUpdate].push(squareId)

    // increment turn count
    newState.turn = this.state.turn + 1
    this.setState(newState)
  }

  getNextMove() {
    const { spaces, turn, winSequences } = this.state
    // choose random square if turn count is less than required to start blocking
    if(turn <= 3) {
      return spaces[Math.floor(Math.random() * spaces.length)]
    }

    const humanScore = this.state[this.getScoreUpdateKey(true)]

    for(let i = 0; i < winSequences.length; i++) {
      const seq = winSequences[i]
      const threat = seq.slice()
      console.log('sequence:', seq)
      console.log('threat:', threat)
      for(let j = 0; j < seq.length; j++) {
        const space = seq[j]
        console.log('human score:', humanScore)
        console.log('updated threat:', threat)
        console.log('space:', space, 'is in human score', humanScore.indexOf(space))
        if(humanScore.indexOf(space) !== -1) {
          threat.splice(humanScore.indexOf(space), 1)
        }
        // if the human players score contains 2 out of 3 winning spaces and the remaining space to complete the win sequence is still available
        if(threat.length === 1 && spaces.indexOf(threat[0]) !== -1) {
          console.log('threat is now a danger')
          return threat[0]
        }
      }
      console.log('---')
    }    
  }

  checkForWinner() {
    const { winSequences } = this.state
    // loop through win sequences and check that the current players score array contains all spaces in the win sequence
    for(let i = 0; i < winSequences.length; i++) {
      // const seq = winSequences[i]
    }
    return false
  }

  endGame() {}

  setPlayers(event) {
    const human = event.target.textContent.toLowerCase()
    const com = human === 'x' ? 'o' : 'x'
    this.setState({ human, com })
  }

  marker(id) {
    // space is still open
    if(this.state.spaces.indexOf(id) !== -1) {
      return ''
    }
    return this.state.xScore.indexOf(id) === -1 ? 'o' : 'x'
  }

  componentDidUpdate() {
    // determine if computer should make a move
    if(this.getScoreUpdateKey().substring(0, 1) !== this.state.com) {
      return
    }
    this.placeMarker()
  }
  
  render() {
    const board = []
    const style = { display: 'block' }

    for(let i = 0; i < 9; i++) {
      board.push(<Square marker={this.marker.call(this, i)} key={i} placeMarker={this.placeMarker.bind(this, i)}></Square>)
    }

    if(this.state.human && this.state.com) {
      style.display = 'none'
    }

    return (
      <div className="App">
        <div id="board">
          <InfoScreen childStyle={style} setPlayers={this.setPlayers}/>
          <div className="wrap">
           { board }
          </div>
        </div>
      </div>
    );
  }
}