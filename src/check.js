export default function Checker(equation) {
  let updatedEquation;
  console.log(equation);
  updatedEquation = equation.replace(/x/g, "*");
  console.log(updatedEquation);
  updatedEquation = updatedEquation.replace(/÷/g, "/");
  console.log(updatedEquation);
  return updatedEquation;
}