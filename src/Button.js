import React, { Component } from 'react';

class Button extends Component {

  handleClick = () => {
    alert(this.props.name);
  }
  render(){
    const { name } = this.props;
    return(
      <div>
        <button onClick={this.handleClick}>{name}</button>
      </div>
    )
  }

}

export default Button;