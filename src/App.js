import React, { Component } from 'react';
import ButtonGrid from './ButtonGrid';
import Display from './Display';
import Checker from './check';


class App extends Component {
  

  constructor(props){
    super(props);
    this.state = {
      name: null
    }
  }

  handleClick = name => {
    let value;
    if(this.state.name !== null)
      value = this.state.name + name;
    else
      value = name;

    if(name === "="){
      // console.log("asdgasd");
      // console.log(value);
      value = Checker(this.state.name);
      value = eval(value);
      console.log(value);
    }
    this.setState({name:value});
  }

  render() {
    return (
      <div className="App">
        <Display logic={this.state.name || "0"}/>
        <ButtonGrid clickHandler={this.handleClick}/>
      </div>
    );
  }
}

export default App;
