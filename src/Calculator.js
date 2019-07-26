import React, { Component } from 'react';
import ButtonGrid from './Buttons/ButtonGrid';
import Display from './Display';
import { calculation, addDecimal, alterSign, sliceValue } from './Calculation';

const operandSymbols = 'x÷+-'
let value;

class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstValue: '',
      operator: '',
      secondValue: '',
      answer: ''
    }
  }

  componentDidMount() {document.addEventListener('keydown', this.handleKeyDown);}
  componentWillUnmount() {document.removeEventListener('keydown', this.handleKeyDown);}

  // when inputting a number, check to what side of the operator to place it
  inputNumber = name => {
    const {firstValue, operator, secondValue} = this.state;
    if(!operator){
      if(!firstValue)
        return this.setState({firstValue:name});
      return this.setState({firstValue:firstValue+name});
    } else{
      return this.setState({secondValue:secondValue+name});
    }
  }

  // adding an operator to our equation
  inputOperator = async name => {
    const {firstValue, operator, secondValue, answer} = this.state;
    if(!operator){
      if(!firstValue && answer) // no first value, but an answer, input the previous answer followed by the operator
        return this.setState({firstValue:answer,operator:name});
      else if(!firstValue && !answer) // no first value or previous answer, add a 0 before our operator
        return this.setState({firstValue:0,operator:name});
      else // we have a first value, add our operator
        return this.setState({operator:name});
    } else {
      if(secondValue){ // if we have a second value, perform the full equation and create a new equation with the first value as the new answer, followed by our inputed operator
        await this.inputEquals();
        return this.setState({firstValue:this.state.answer,operator:name}); //Need to use this.state.answer as it updates
      }
    }
  }

  inputEquals = () => {
    const {firstValue, operator, secondValue} = this.state;
    value = calculation(operator, firstValue, secondValue);
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
    const { firstValue, operator, secondValue} = this.state;
    if(operator){
      if(!secondValue.includes('.'))
        return this.inputNumber(addDecimal(secondValue));
    } else {
      if(!firstValue.includes('.'))
        return this.inputNumber(addDecimal(firstValue));
    }
  }

  inputDelete = () => { // Deleting previous value
    const {firstValue, operator, secondValue} = this.state;
    if(operator && !secondValue) // If the last input was an operator, delete and update our state to reflect that
      return this.setState({operator:''});
    if(operator) // check if last value was either first or second and update state to reflect
      return this.setState({secondValue:sliceValue(secondValue)});
    else
      return this.setState({firstValue:sliceValue(firstValue)});
  }

  changeSign = () => { // Change our first or second value to a negative and back again
    const {firstValue, operator, secondValue} = this.state;
    if(!operator)
      return this.setState({firstValue:alterSign(firstValue)});
    else
      return this.setState({secondValue:alterSign(secondValue)});
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

  resetAll = () =>
    this.setState({answer:'', firstValue:'', secondValue:'', operator:''});

  resetInputs = () =>
    this.setState({firstValue:'', secondValue:'', operator:''});

  render() {
    let equation = this.state.firstValue + this.state.operator + this.state.secondValue;
    return (
      <div id="calc-body">
        <Display equation={equation} answer={this.state.answer} />
          <ButtonGrid
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
    );
  }
}

export default Calculator;