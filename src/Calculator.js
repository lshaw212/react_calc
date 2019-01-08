let value;
export default function Calculator(firstValue,secondValue,operator) {
  if(operator === "+")
    return value = parseFloat(firstValue) + parseFloat(secondValue);
  else if(operator === "-")
    return value = parseFloat(firstValue) - parseFloat(secondValue);
  else if(operator === "x")
    return value = parseFloat(firstValue) * parseFloat(secondValue);
  else if(operator === "÷")
    return value = parseFloat(firstValue) / parseFloat(secondValue);
}