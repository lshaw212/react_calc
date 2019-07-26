import React, { Component } from 'react';

class Button extends Component {

  handleClick = () => {
    this.props.clickHandler(this.props.name);
  }
  render(){
    const { name, btnColour } = this.props;
    return(
      <div>
        <button onClick={this.handleClick} className="calc-btn" style={{background:`#${btnColour}`}}>{name}</button>
      </div>
    )
  }

}

export default Button;