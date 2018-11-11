import React, { Component } from 'react';

export default class Square extends Component {

  render() {
    const { marker } = this.props
    const classes = [ 'square', 'perfect-center-parent' ]
    let icon = marker ? ( marker === 'x' ? 'times' : 'circle' ) : null

    if(icon) {
      classes.push('marked', `marked-${marker}`)
    }

    return (
      <div onClick={this.props.placeMarker} className={ classes.join(' ') }>
        { icon && <span className="marker perfect-center-child"><i className={'fas fa-' + icon}></i></span> }
      </div>
    );
  }
}