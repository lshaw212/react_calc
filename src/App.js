import React, { Component } from 'react';
import ButtonGrid from './ButtonGrid';
import Display from './Display';
import Calculator from "./Calculator";
import Checker from './check';

const operandSymbols = "x÷+-"
let value,equation;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      answer: null,
      equation: '',
      firstValue: '',
      secondValue: '',
      operator: null,
      waitingForOperand: false
    }
  }

  inputNumber = name => {
    if(this.state.waitingForOperand === true){
      value= this.state.secondValue + name;
      equation = this.state.equation + name;
      this.setState({secondValue:value,equation:equation});
    } else {
      value = this.state.firstValue + name;
      equation = this.state.equation + name;
      this.setState({firstValue:value,equation:equation});
    }
  }

  inputOperator = name => {
    if(operandSymbols.includes(name)){
      equation = this.state.equation + name;
      this.setState({waitingForOperand:true,operator:name,equation:equation});
      return
    }
  }

  inputEquals = () => {
    value = Calculator(this.state.firstValue,this.state.secondValue,this.state.operator);
    this.setState({answer:value});
    this.resetState();
    return
  }

  inputAnswer = () => {
    if(this.state.answer){
      this.inputNumber(this.state.answer)
    }
  }
  inputDot = () => {
    if(!this.state.equation.includes('.'))
      this.inputNumber('.');
    else
      return;
  }
  inputDelete = () => {
    equation = this.state.equation.slice(0,-1);
    this.setState({equation:equation});
  }


  resetState = () =>{
    this.setState({
      equation: '',
      firstValue: '',
      secondValue: '',
      operator: null,
      waitingForOperand: false
    });
  }

  render() {
    return (
      <div className="App">
        <Display style={{backgroundColor: 'red'}} logic={this.state.equation || '0'}/>
        <Display style={{backgroundColor: 'aqua'}} logic={this.state.answer || '0'} />
        <ButtonGrid
          inputNumber={this.inputNumber}
          inputOperator={this.inputOperator}
          inputEquals={this.inputEquals}
          inputAnswer={this.inputAnswer}
          inputDot={this.inputDot}
          inputDelete={this.inputDelete}
          reset={this.resetState}
        />
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