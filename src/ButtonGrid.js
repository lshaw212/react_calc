import React, { Component } from 'react';
import Button from './Button';

const ButtonGrid = ({inputNumber,inputOperator,inputEquals,inputDot,inputDelete,inputAnswer, clickHandler, reset}) =>(
  <div id="button-grid">
    <div>
      <Button name="7" clickHandler={inputNumber}></Button>
      <Button name="4" clickHandler={inputNumber}></Button>
      <Button name="1" clickHandler={inputNumber}></Button>
      <Button name="0" clickHandler={inputNumber}></Button>
    </div>
    <div>
      <Button name="8" clickHandler={inputNumber}></Button>
      <Button name="5" clickHandler={inputNumber}></Button>
      <Button name="2" clickHandler={inputNumber}></Button>
      <Button name="." clickHandler={inputDot}></Button>
    </div>
    <div>
      <Button name="9" clickHandler={inputNumber}></Button>
      <Button name="6" clickHandler={inputNumber}></Button>
      <Button name="3" clickHandler={inputNumber}></Button>
      <Button name="ANS" clickHandler={inputAnswer}></Button>
    </div>
    <div>
      <Button name="DEL" clickHandler={inputDelete}></Button>
      <Button name="x" clickHandler={inputOperator}></Button>
      <Button name="+" clickHandler={inputOperator}></Button>
      <Button name=")" clickHandler={clickHandler}></Button>
    </div>
    <div>
      <Button name="AC" clickHandler={reset}></Button>
      <Button name="÷" clickHandler={inputOperator}></Button>
      <Button name="-" clickHandler={inputOperator}></Button>
      <Button id="button-equals" name="=" clickHandler={inputEquals}></Button>
    </div>
  </div>
)

export default ButtonGrid;