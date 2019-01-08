export default function Calculator(firstValue,secondValue,operator) {
  let value;
  if(operator === "+")
    value = parseFloat(firstValue) + parseFloat(secondValue);
  else if(operator === "-")
    value = parseFloat(firstValue) - parseFloat(secondValue);
  else if(operator === "x")
    value = parseFloat(firstValue) * parseFloat(secondValue);
  else if(operator === "÷")
    value = parseFloat(firstValue) / parseFloat(secondValue);
  return value;
}


// import React, { Component } from 'react';

// class Calculator extends Component {

//   constructor(props){
//     super(props);
//     this.state={

//     }
//   }

//   render(){
//     return(
//       <div>

//       </div>
//     )
//   }
// }

// export default Calculator;