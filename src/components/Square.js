import React, { Component } from 'react';

export default class Square extends Component {
  
  render() {
    return (
      <div onClick={this.props.placeMarker} className="square">
        { this.props.marker && <span className="marker">
          { this.props.marker }
        </span> }
      </div>
    );
  }
}