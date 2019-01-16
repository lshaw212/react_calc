import React, { Component } from 'react';
import ButtonGrid from './ButtonGrid';
import Display from './Display';
import Calculator from "./Calculator";
import Footer from './Footer';

const operandSymbols = 'x÷+-'
let value;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      answer: '',
      equation: '',
      firstValue: '',
      secondValue: '',
      operator: null,
      waitingForOperator: true
    }
  }

  inputNumber = name => {
    const {firstValue, secondValue, equation, waitingForOperator} = this.state;
    if(waitingForOperator){
      if(!firstValue){
        return this.setState({firstValue:name,equation:name});
      }
      return this.setState({firstValue:firstValue+name,equation:equation+name});
    } else
      return this.setState({secondValue:secondValue+name,equation:equation+name});
  }

  inputOperator = async name => {
    const {operator, firstValue, secondValue, answer} = this.state;
    if(!operator){
      if(!firstValue && answer)
        return this.setState({firstValue:answer,operator:name, equation:answer + name, waitingForOperator:false});
      else if(!firstValue && !answer)
        return this.setState({firstValue:0,operator:name, equation:0 + name, waitingForOperator:false});
      else
        return this.setState({operator:name, equation:firstValue + name, waitingForOperator:false});
    } else {
      if(secondValue){
        await this.inputEquals();
        return this.setState({firstValue:this.state.answer,operator:name,equation:this.state.answer+name, waitingForOperator:false}); //Need to use this.state.answer as it updates
      } else
        return await this.setState({operator:name,equation:firstValue+name});
    }
  }

  inputEquals = () => {
    console.log("perform equation");
    const {firstValue,secondValue,operator} = this.state;
    value = Calculator(firstValue, secondValue, operator);
    // When value is 0, nothing is displayed FIX
    if(value){
      this.resetInputs();
      this.setState({answer:value});
    }
    return;
  }

  inputAnswer = () => {
    if(this.state.answer){
      this.inputNumber(this.state.answer)
    }
  }
  inputDot = () => {
    const { firstValue, secondValue, waitingForOperator} = this.state;
    if(!waitingForOperator){
      if(!secondValue.includes('.'))
        return this.inputNumber('.');
    } else {
      if(!firstValue.includes('.'))
        return this.inputNumber('.');
    }
  }
  inputDelete = () => {
    const {equation,secondValue,firstValue,waitingForOperator} = this.state;
    let lastChar = equation[equation.length-1];
    let slice = equation.slice(0,-1);
    if(operandSymbols.includes(lastChar))
      return this.setState({operator:null,waitingForOperator:true,equation:slice}) 
    if(!waitingForOperator){
      value = secondValue.slice(0,-1);
      return this.setState({secondValue:value,equation:slice});
    } else {
      value = firstValue.slice(0,-1);
      return this.setState({firstValue:value,equation:slice});
    }
  }
  changeSign = () => {
    const {firstValue,secondValue,operator,waitingForOperator} = this.state;
    let calc;
    if(waitingForOperator){
      calc = Number(firstValue) * -1;
      return this.setState({firstValue:calc,equation:calc});
    } else {
      calc = Number(secondValue) * -1;
      return this.setState({secondValue:calc,equation:firstValue+operator+calc});
    }
  }

  handleKeyDown = (event) => {
    let { key } = event;
    //Change icons for use
    if(key === '/')
      key = '÷';
    if(key === '*')
      key = 'x';

    if((/^[0-9]*$/).test(key))
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

  resetAll = () => {
    this.setState({
      answer: '',
      equation: '',
      firstValue: '',
      secondValue: '',
      operator: null,
      waitingForOperator: true
    });
  }

  resetInputs = () => {
    this.setState({
      firstValue: '',
      secondValue: '',
      operator: null,
      waitingForOperator: true
    })
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
              reset={this.resetAll}
            />
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;