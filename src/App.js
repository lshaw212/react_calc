import React, { Component } from 'react';
import ButtonGrid from './ButtonGrid';
import Display from './Display';
import Calculator from "./Calculator";
import Footer from './Footer';
import DisplayText from "./DisplayText";
import Checker from './check';

const operandSymbols = 'x÷+-'
const Operators = '0123456789';
let answer,value,equation, firstValue, secondValue;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      answer: 0,
      equation: '',
      firstValue: '',
      secondValue: '',
      operator: null,
      waitingForOperator: true
    }
  }

  inputNumber = name => {
    if(!this.state.waitingForOperator){
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
    if(!isNaN(value) && this.state.waitingForOperator){
      equation= this.state.equation + name;
      return this.setState({equation:equation, waitingForOperator:false, operator:name});
    } else if(!isNaN(value) && !this.state.waitingForOperator) {
      await this.inputEquals();
      equation = this.state.answer + name;
      return this.setState({waitingForOperator:false,firstValue:this.state.answer,operator:name,equation:equation});
    } else if(!value){
      if(this.state.answer === 0){
        equation = 0 + name;
        return this.setState({equation:equation, firstValue:0,operator:name, waitingForOperator:true});
      } else{
        equation = this.state.answer + name;
        return this.setState({equation:equation, firstValue:this.state.answer,operator:name, waitingForOperator:false});
      }
    }
    console.log("Fix when a dot is last");
    return
  }

  inputEquals = () => {
    value = Calculator(this.state.firstValue,this.state.secondValue,this.state.operator);
    this.resetState();
    if(value)
      this.setState({answer:value});
    return
  }

  inputAnswer = () => {
    if(this.state.answer){
      this.inputNumber(this.state.answer)
    }
  }
  inputDot = () => {
    if(!this.state.waitingForOperator){
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
      return this.setState({operator:null,waitingForOperator:true,equation:equation})
    if(!this.state.waitingForOperator){
      value = this.state.secondValue.slice(0,-1);
      return this.setState({secondValue:value,equation:equation});
    } else {
      value = this.state.firstValue.slice(0,-1);
      return this.setState({firstValue:value,equation:equation});
    }
  }
  changeSign = () => {
    if(this.state.waitingForOperator)
    {
      firstValue = Number(this.state.firstValue) * -1;
      equation = firstValue;
      return this.setState({firstValue:firstValue,equation:equation});
    } else {
      secondValue = Number(this.state.secondValue) * -1;
      equation = this.state.firstValue + this.state.operator + secondValue;
      return this.setState({secondValue:secondValue,equation:equation});
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
      return this.inputNumber(key);
    else if(key === '.')
      return this.inputDot();
    else if(key === 'Backspace')
      return this.inputDelete();
    else if(operandSymbols.includes(key))
      return this.inputOperator(key);
    else if(key === 'Enter')
      return this.inputEquals();
  }

  resetState = () =>{
    this.setState({
      answer: 0,
      firstValue: '',
      secondValue: '',
      operator: null,
      waitingForOperator:true
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
        <div id="content">
          <div id="calc-body">
            <div id="calc-name">CASIO</div>
            <Display equation={this.state.equation} answer={this.state.answer} />
            <ButtonGrid
              id="button-grid"
              inputNumber={this.inputNumber}
              inputOperator={this.inputOperator}
              inputEquals={this.inputEquals}
              inputAnswer={this.inputAnswer}
              inputDot={this.inputDot}
              inputDelete={this.inputDelete}
              changeSign={this.changeSign}
              reset={this.resetState}
            />
          </div>
        </div>
        <Footer/>
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