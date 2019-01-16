
export default function Calculator(operator,firstValue,secondValue) {
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
  }
}