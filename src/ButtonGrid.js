import React, { Component } from 'react';
import Button from './Button';

class ButtonGrid extends Component {

  handleClick = name => {
    this.props.clickHandler(name)
  }


  render(){
    return(
      <div id="button-grid">
        <div>
          <Button name="7" clickHandler={this.handleClick}></Button>
          <Button name="4" clickHandler={this.handleClick}></Button>
          <Button name="1" clickHandler={this.handleClick}></Button>
          <Button name="0" clickHandler={this.handleClick}></Button>
        </div>
        <div>
          <Button name="8" clickHandler={this.handleClick}></Button>
          <Button name="5" clickHandler={this.handleClick}></Button>
          <Button name="2" clickHandler={this.handleClick}></Button>
          <Button name="." clickHandler={this.handleClick}></Button>
        </div>
        <div>
          <Button name="9" clickHandler={this.handleClick}></Button>
          <Button name="6" clickHandler={this.handleClick}></Button>
          <Button name="3" clickHandler={this.handleClick}></Button>
          <Button name="(" clickHandler={this.handleClick}></Button>
        </div>
        <div>
          <Button name="DEL" clickHandler={this.handleClick}></Button>
          <Button name="x" clickHandler={this.handleClick}></Button>
          <Button name="+" clickHandler={this.handleClick}></Button>
          <Button name=")" clickHandler={this.handleClick}></Button>
        </div>
        <div>
          <Button name="AC" clickHandler={this.handleClick}></Button>
          <Button name="÷" clickHandler={this.handleClick}></Button>
          <Button name="-" clickHandler={this.handleClick}></Button>
          <Button id="button-equals" name="=" clickHandler={this.handleClick}></Button>
        </div>
      </div>
    )
  }
}

export default ButtonGrid;