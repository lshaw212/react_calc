import React, { Component } from 'react';
import ButtonGrid from './ButtonGrid';
import Display from './Display';
import Calculator from "./Calculator";
import Checker from './check';

const operandSymbols = 'x÷+-'
const Operators = '0123456789';
let answer,value,equation;

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

  inputOperator = async name => {
    value = this.state.equation[this.state.equation.length-1];
    let g = "f";
    if(!isNaN(value)){
      console.log("Oh???");
      equation= this.state.equation + name;
      return this.setState({equation:equation, waitingForOperand:true, operator:name});
    } else if(!isNaN(value) && this.state.waitingForOperand == true) {
      console.log("oh?");
      await this.inputEquals();
      equation = this.state.answer + name;
      return this.setState({waitingForOperand:true,firstValue:this.state.answer,operator:name,equation:equation});
    }
    return

    // if(operandSymbols.includes(name) && this.state.waitingForOperand === false){
    //   equation = this.state.equation + name;
    //   return this.setState({waitingForOperand:true,operator:name,equation:equation});
    // } 
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
    if(this.state.waitingForOperand === true){
      if(!this.state.secondValue.includes('.'))
        return this.inputNumber('.');
    } else {
      if(!this.state.firstValue.includes('.'))
        return this.inputNumber('.');
    }
  }
  inputDelete = () => {
    let lastChar = this.state.equation[this.state.equation.length-1];
    equation = this.state.equation.slice(0,-1);
    if(operandSymbols.includes(lastChar))
      return this.setState({operator:null,waitingForOperand:false,equation:equation})
    if(this.state.waitingForOperand === true){
      value = this.state.secondValue.slice(0,-1);
      return this.setState({secondValue:value,equation:equation});
    } else {
      value = this.state.firstValue.slice(0,-1);
      return this.setState({firstValue:value,equation:equation});
    }
  }

  handleKeyDown = (event) => {
    let { key } = event;

    //Change icons for use
    if(key === '/')
      key = '÷';
    if(key === '*')
      key = 'x';

    if((/\d/).test(key))
      this.inputNumber(key);
    else if(key === '.')
      this.inputDot();
    else if(key === 'Backspace')
      this.inputDelete();
    else if(operandSymbols.includes(key)){
      console.log(key);
      this.inputOperator(key);
    }
    else if(key === 'Enter')
      this.inputEquals();
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

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    return (
      <div className="App">
        <Display text="Equation: " style={{backgroundColor: 'red'}} logic={this.state.equation || '0'}/>
        <Display text="Answer: " style={{backgroundColor: 'aqua'}} logic={this.state.answer || '0'} />
        <ButtonGrid
          inputNumber={this.inputNumber}
          inputOperator={this.inputOperator}
          inputEquals={this.inputEquals}
          inputAnswer={this.inputAnswer}
          inputDot={this.inputDot}
          inputDelete={this.inputDelete}
          reset={this.resetState}
        />
        <Display text="answer -  " logic={this.state.answer}/>
        <Display text="equation -  " logic={this.state.equation}/>
        <Display text="firstValue -  " logic={this.state.firstValue}/>
        <Display text="secondValue -  " logic={this.state.secondValue}/>
        <Display text="operator -  " logic={this.state.operator}/>
        <Display text="waitingForOperand -  " logic={this.state.waitingForOperand}/>
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


// inputOperator = async name => {
//   value = this.state.equation[this.state.equation.length-1];
//   if(!this.state.firstValue){
//     console.log("YAYYA");
//   }
 
//   if(operandSymbols.includes(name) && this.state.waitingForOperand === false){
//     equation = this.state.equation + name;
//     return this.setState({waitingForOperand:true,operator:name,equation:equation});
 
//   } else if(operandSymbols.includes(name) && this.state.waitingForOperand === true){
    
 
//     if(operandSymbols.includes(value)){
//       return
//     }
//     await this.inputEquals();
//     equation = this.state.answer + name;
//     return this.setState({waitingForOperand:true,firstValue:this.state.answer,operator:name,equation:equation});
//   }
// }