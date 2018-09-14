import React, { Component } from 'react';
import './App.css';
import Calculator from './components/Calculator';

class App extends Component {
  render() {
    return (
      <div className="container d-flex flex-column h-100 justify-content-center align-items-center">
        <h1 className="title text-center">Simple Calculator</h1>
        <br />
        <Calculator />
      </div>
    );
  }
}

export default App;
