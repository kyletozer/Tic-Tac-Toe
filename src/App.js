import React, { Component } from 'react';
import Square from './components/Square'
import InfoScreen from './components/InfoScreen'

const getSpaces = () => [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]

export default class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      friend: false,
      winner: false,
      turn: 1,
      human: null,
      com: null,
      spaces: getSpaces(),
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
  
    this.startGame = this.startGame.bind(this)
    this.placeMarker = this.placeMarker.bind(this)
  }

  getScoreUpdateKey(inverse = false) {
    const { turn } = this.state
    let cond = inverse ? turn % 2 === 0 : turn % 2 !== 0
    return (cond ? 'x' : 'o') + 'Score'
  }

  placeMarker(squareId = null) {
    const { spaces } = this.state

    if(typeof squareId === 'object') {
      squareId = this.getNextMove()
    }

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
    const { spaces, turn, winSequences, com } = this.state
    const humanScore = this.state[this.getScoreUpdateKey(true)]
    const comScore = this.state[this.getScoreUpdateKey()]

    for(let i = 0; i < winSequences.length; i++) {
      const seq = winSequences[i]
      const threat = seq.slice()
      const victory = seq.slice()
      // the threat and victory arrays keep track of which winning combination spaces are held by the human and computer players respectively
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
      
      // human takes corner in first move
      if(com === 'o' && turn === 2 && [0, 2, 6, 8].indexOf(humanScore[0]) !== -1) {
        return 4
      }
      // human takes opposing corners in second move
      if(com === 'o' && turn === 4 && ([0, 8].every(space => humanScore.indexOf(space) !== -1) || [2, 6].every(space => humanScore.indexOf(space) !== -1))) {
        return 1
      }
      // win
      if(victory.length === 1 && spaces.indexOf(victory[0]) !== -1) {
        return victory[0]
      }
      // block     
      if(threat.length === 1 && spaces.indexOf(threat[0]) !== -1) {
        return threat[0]
      }
      // console.log('---')
    }
    // choose random square if turn count is less than required to start blocking
    return spaces[Math.floor(Math.random() * spaces.length)]
  }

  checkForWinner() {
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
    this.setState({
      winner: this.getScoreUpdateKey(true).substring(0, 1)
    })
  }

  startGame(data, event) {
    event.preventDefault()
    const human = data.human
    const com = human === 'x' ? 'o' : 'x'
    
    // reset game state
    this.setState({
      friend: data.friend,
      human,
      com,
      winner: null,
      xScore: [],
      oScore: [],
      spaces: getSpaces(),
      turn: 1
    })
  }

  marker(id) {
    // space is still open
    if(this.state.spaces.indexOf(id) !== -1) {
      return ''
    }
    return this.state.xScore.indexOf(id) === -1 ? 'o' : 'x'
  }

  componentDidUpdate() {
    const { turn, winner, com, friend } = this.state
    
    // if a winner is set, do nothing
    if(winner) return
    
    // check for a winner and end the current game if a winner exists
    if(turn > 5 && this.checkForWinner()) {
      this.endGame()
      return
    }

    // determine if the computer should make a move
    if(!friend && this.getScoreUpdateKey().substring(0, 1) === com) { 
      this.placeMarker()      
    } 
  }
  
  render() {
    const board = []
    const style = { display: 'none' }
    const { com, human, winner, turn } = this.state
    let message = ''

    for(let i = 0; i < 9; i++) {
      board.push(<Square marker={this.marker.call(this, i)} key={i} placeMarker={this.placeMarker.bind(this, i)}></Square>)
    }

    if(winner === human) {
      message = 'You Win!'
    } else if(winner === com) {
      message = 'You Lose!'
    } else if(turn === 10) {
      message = 'Draw!'
      style.display = 'block'
    }

    // show overlay
    if(!com || winner) {
      style.display = 'block'
    }

    return (
      <div className="App">
        <div id="board">
          <InfoScreen childStyle={style} startGame={this.startGame.bind(this)} message={message}/>
          <div className="wrap perfect-center-child">
           { board }
          </div>
        </div>
      </div>
    );
  }
}