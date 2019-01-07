export default function Checker(symbol) {
  let updatedEquation;
  if(symbol === "÷")
    updatedEquation = "/"
  return updatedEquation;
}


// console.log(equation);
//   updatedEquation = equation.replace(/x/g, "*");
//   console.log(updatedEquation);
//   updatedEquation = updatedEquation.replace(/÷/g, "/");
//   console.log(updatedEquation);