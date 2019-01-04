import React, { Component } from 'react';
import Button from './Button';

class ButtonGrid extends Component {

  render(){
    return(
      <div id="button-grid">
        <div>
          <Button name="M-"></Button>
          <Button name="7"></Button>
          <Button name="4"></Button>
          <Button name="1"></Button>
          <Button name="0"></Button>
        </div>
        <div>
          <Button name="M+"></Button>
          <Button name="8"></Button>
          <Button name="5"></Button>
          <Button name="2"></Button>
          <Button name="."></Button>
        </div>
        <div>
          <Button name="%"></Button>
          <Button name="9"></Button>
          <Button name="6"></Button>
          <Button name="3"></Button>
          <Button name="="></Button>
        </div>
        <div>
          <Button name="/"></Button>
          <Button name="x"></Button>
          <Button name="-"></Button>
          <Button id="button-equals" name="+"></Button>
        </div>
      </div>
    )
  }
}

export default ButtonGrid;