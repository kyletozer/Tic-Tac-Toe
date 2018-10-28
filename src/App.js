import React, { Component } from 'react';
import Square from './components/Square'
import InfoScreen from './components/InfoScreen'

export default class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      winner: true,
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
    const { spaces } = this.state

    const spaceIndex = spaces.indexOf(squareId)
    const newState = {}

    // determine which score to update
    const scoreToUpdate = this.getScoreUpdateKey()

    // if the space is no longer available, do nothing
    if(spaceIndex === -1) return

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
    const comScore = this.state[this.getScoreUpdateKey()]

    for(let i = 0; i < winSequences.length; i++) {
      const seq = winSequences[i]
      const threat = seq.slice()
      const victory = seq.slice()
      // console.log('sequence:', seq)
      // console.log('human score:', humanScore)
      for(let j = 0; j < seq.length; j++) {
        const space = seq[j]
        const inHumanScore = humanScore.indexOf(space)
        const inComScore = comScore.indexOf(space)
        // console.log('space:', space, 'in human score:', inHumanScore)
        if(inHumanScore !== -1) {
          threat.splice(threat.indexOf(space), 1)
        }
        if(inComScore !== -1) {
          victory.splice(victory.indexOf(space), 1)
        }
      }
      // console.log('updated threat:', threat)
      // console.log('threat is still available', spaces.indexOf(threat[0]) !== -1)
      if(threat.length === 1 && spaces.indexOf(threat[0]) !== -1) {
        return threat[0]
      }
      if(victory.length === 1 && spaces.indexOf(victory[0]) !== -1) {
        return victory[0]
      }
      // console.log('---')
    }
    return spaces[0]
  }

  checkForWinner() {
    console.log('checking for winner')
    // check the player score of the previous turn as by the time it does the check it will be in a new turn cycle
    const { winSequences } = this.state
    const score = this.state[this.getScoreUpdateKey(true)]

    for(let i = 0; i < winSequences.length; i++) {
      const seq = winSequences[i]
      for(let j = 0; j < seq.length; j++) {
        const space = seq[j]
        if(score.indexOf(space) === -1) {
          break
        }
        if(j === 2) {
          return true
        }
      }
    }
    return false
  }

  endGame() {
    console.log('game over')
  }

  setPlayers(event) {
    const human = event.target.textContent.toLowerCase()
    const com = human === 'x' ? 'o' : 'x'
    this.setState({ human, com, winner: false })
  }

  marker(id) {
    // space is still open
    if(this.state.spaces.indexOf(id) !== -1) {
      return ''
    }
    return this.state.xScore.indexOf(id) === -1 ? 'o' : 'x'
  }

  componentDidUpdate() {
    const { turn } = this.state
    if(turn > 5 && this.checkForWinner()) {
      this.endGame()
    }
  }
  
  render() {
    const board = []
    const style = { display: 'none' }

    for(let i = 0; i < 9; i++) {
      board.push(<Square marker={this.marker.call(this, i)} key={i} placeMarker={this.placeMarker.bind(this, i)}></Square>)
    }

    // show overlay
    if(this.state.winner) {
      style.display = 'block'
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