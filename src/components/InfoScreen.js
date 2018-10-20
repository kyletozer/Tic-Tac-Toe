import React, { Component } from 'react';

export default class InfoScreen extends Component {

  render() {
    return (
      <div style={this.props.childStyle} className="overlay">
        <h2>Choose a side</h2>
        <div className="choose-team" onClick={this.props.setPlayers}>
          <div className="side-x">X</div>
          <div className="side-o">O</div>
        </div>
      </div>
    )
  }
}