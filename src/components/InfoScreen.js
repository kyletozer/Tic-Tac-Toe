import React from 'react';

export default function InfoScreen(props) {
  
  const { childStyle, message } = props

  return (
    <div style={childStyle} className="overlay">
      { message && <div className="winner">
        "{ message }"
      </div> }
      <h2>Choose a side</h2>
      <div className="choose-team" onClick={props.setPlayers}>
        <div className="side-x">X</div>
        <div className="side-o">O</div>
      </div>
    </div>
  )
}