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

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  // when inputting a number, check to what side of the operator to place it
  inputNumber = name => {
    const {firstValue, secondValue, equation, waitingForOperator} = this.state;
    if(waitingForOperator){
      if(!firstValue){
        console.log("here")
        console.log(name);
        return this.setState({firstValue:name,equation:name});
      }
      return this.setState({firstValue:firstValue+name,equation:equation+name});
    } else
      return this.setState({secondValue:secondValue+name,equation:equation+name});
  }

  // adding an operator to our equation
  inputOperator = async name => {
    const {operator, firstValue, secondValue, answer} = this.state;
    if(!operator){
      if(!firstValue && answer) // no first value, but an answer, input the previous answer followed by the operator
        return this.setState({firstValue:answer,operator:name, equation:answer + name, waitingForOperator:false});
      else if(!firstValue && !answer) // no first value or previous answer, add a 0 before our operator
        return this.setState({firstValue:0,operator:name, equation:0 + name, waitingForOperator:false});
      else // we have a first value, add our operator
        return this.setState({operator:name, equation:(firstValue + name), waitingForOperator:false});
    } else {
      if(secondValue){ // if we have a second value, perform the full equation and create a new equation with the first value as the new answer, followed by our inputed operator
        await this.inputEquals();
        return this.setState({firstValue:this.state.answer,operator:name,equation:this.state.answer+name, waitingForOperator:false}); //Need to use this.state.answer as it updates
      }
    }
  }

  inputEquals = () => {
    const {firstValue,secondValue,operator} = this.state;
    value = Calculator(operator, firstValue, secondValue);
    if(value || value === 0){ // Check if our value exists or is a 0 after pressing "=" and perform the actions to display a new answer and resting previous inputs 
      value = parseFloat(value);
      
      this.resetInputs();
      this.setState({answer:value});
    }
    return;
  }

  inputAnswer = () => { // Input the answer when the ans button is clicked
    if(this.state.answer){
      return this.inputNumber(this.state.answer.toString()) // convert to string
    }
  }

  inputDot = () => { // Input a decimal point, checking whether we are on first or second value and if a decimal is already present
    const { firstValue, secondValue, waitingForOperator} = this.state;
    if(!waitingForOperator){
      if(!secondValue.includes('.'))
        return this.inputNumber('.');
    } else {
      if(!firstValue.includes('.'))
        return this.inputNumber('.');
    }
  }

  inputDelete = () => { // Deleting previous value
    const {equation,secondValue,firstValue,waitingForOperator} = this.state;
    let lastChar = equation[equation.length-1];
    let slice = equation.slice(0,-1);
    if(operandSymbols.includes(lastChar)) // If the last input was an operator, delete and update our state to reflect that
      return this.setState({operator:null,waitingForOperator:true,equation:slice}) 
    if(!waitingForOperator){ // check if last value was either first or second and update state to reflect
      value = secondValue.slice(0,-1);
      return this.setState({secondValue:value,equation:slice});
    } else {
      value = firstValue.slice(0,-1);
      return this.setState({firstValue:value,equation:slice});
    }
  }
  changeSign = () => { // Change our first or second value to a negative and back again
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

    if(key === '/')
      key = '÷';
    if(key === '*')
      key = 'x';

    if((/^[0-9]*$/).test(key)) // Testing our input for a number value
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