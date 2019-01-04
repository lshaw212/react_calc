import React, { Component } from 'react';
import ButtonGrid from './ButtonGrid';
import Display from './Display';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Display/>
        <ButtonGrid/>
      </div>
    );
  }
}

export default App;
