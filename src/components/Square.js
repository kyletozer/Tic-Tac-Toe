import React, { Component } from 'react';

export default class Square extends Component {

  render() {
    let marker = ''
    const classes = [ 'square' ]

    if(this.props.marker) {
      marker = <span className="marker">{ this.props.marker }</span>
      classes.push('marked')
    }

    return (
      <div onClick={this.props.placeMarker} className={ classes.join(' ') }>
        { marker }
      </div>
    );
  }
}