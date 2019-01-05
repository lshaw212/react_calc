import React, { Component } from 'react';

class Display extends Component {
  render(){
    return(
      <div id="display">{this.props.logic}</div>
    )
  }
}

export default Display;