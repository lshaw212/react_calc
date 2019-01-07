import React, { Component } from 'react';
import ButtonGrid from './ButtonGrid';
import Display from './Display';
import Calculator from "./Calculator";
import Checker from './check';
import * as math from 'mathjs';

const operandSymbols = "x÷+-"

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: '',
      secondValue: '',
      operator: null,
      waitingForOperand: false
    }
  }

  handleClick = name => {
    let value;

    //checks for
    if(operandSymbols.includes(name)){
      // let symbol = Checker(name);
      this.setState({operator:name})
    }

    if(name === "=")
      console.log("equals");
      
    //adding to first value
    //
    if(!this.state.waitingForOperator)
      Calculator(this.state.value,this.state.secondValue,this.state.operator);
    
    value = this.state.value + name;
    this.setState({value:value});
  }

  render() {
    return (
      <div className="App">
        <Display logic={this.state.value || "0"}/>
        <ButtonGrid clickHandler={this.handleClick}/>
      </div>
    );
  }
}

export default App;



// handleClick = name => {
//   let value;
//   if(this.state.name !== null)
//     value = this.state.name + name;
//   else
//     value = name;

//   if(name === "="){
//     value = Checker(this.state.name);
//     value = (this.state.name);
//     console.log(value);
//   }
//   this.setState({name:value});
// }