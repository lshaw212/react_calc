
export const calculation = (operator,firstValue,secondValue) => {
  switch(operator) {
    case "+":
      return parseFloat(firstValue) + parseFloat(secondValue);
    case "-":
      return parseFloat(firstValue) - parseFloat(secondValue);
    case "x":
      return parseFloat(firstValue) * parseFloat(secondValue);
    case "÷":
      return parseFloat(firstValue) / parseFloat(secondValue);
    default:
      console.log("Calculation did not work");
      return;
  }
}
export const addDecimal = (value) => {
  if(!value)
    return '0.';
  else
    return '.';
}

export const alterSign = (value) => {
    return Number(value) * -1;
}

export const sliceValue =(value) => {
  return value.slice(0,-1);
}