import React from 'react';
import Button from './Button';

const ButtonGrid = ({inputNumber,inputOperator,inputEquals,inputDot,inputDelete,inputAnswer,changeSign, reset}) =>(
  <div id="button-grid">
    <div className="button-columns">
      <Button name="7" clickHandler={inputNumber}></Button>
      <Button name="4" clickHandler={inputNumber}></Button>
      <Button name="1" clickHandler={inputNumber}></Button>
      <Button name="0" clickHandler={inputNumber}></Button>
    </div>
    <div className="button-columns">
      <Button name="8" clickHandler={inputNumber}></Button>
      <Button name="5" clickHandler={inputNumber}></Button>
      <Button name="2" clickHandler={inputNumber}></Button>
      <Button name="." clickHandler={inputDot}></Button>
    </div>
    <div className="button-columns">
      <Button name="9" clickHandler={inputNumber}></Button>
      <Button name="6" clickHandler={inputNumber}></Button>
      <Button name="3" clickHandler={inputNumber}></Button>
      <Button name="ANS" clickHandler={inputAnswer}></Button>
    </div>
    <div className="button-columns">
      <Button name="DEL" clickHandler={inputDelete}></Button>
      <Button name="x" clickHandler={inputOperator} btnColour="130f10"></Button>
      <Button name="+" clickHandler={inputOperator} btnColour="130f10"></Button>
      <Button name="±" clickHandler={changeSign}></Button>
    </div>
    <div className="button-columns">
      <Button name="AC" clickHandler={reset}></Button>
      <Button name="÷" clickHandler={inputOperator} btnColour="130f10"></Button>
      <Button name="-" clickHandler={inputOperator} btnColour="130f10"></Button>
      <Button name="=" clickHandler={inputEquals} btnColour="f25a2b"></Button>
    </div>
  </div>
)

export default ButtonGrid;