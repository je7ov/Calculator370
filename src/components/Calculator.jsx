import React, { Component, Fragment } from 'react';
import CalcButton from './CalcButton';

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      output: '0',
      cleared: true,
      decimal: false,
      operator: null,
      nextOperator: null,
      zero: false,
      x: null,
      y: null
    };

    this.calculate = this.calculate.bind(this);
    this.calculateState = this.calculateState.bind(this);
    this.calculateStateWithOp = this.calculateStateWithOp.bind(this);
    this.onNumberClick = this.onNumberClick.bind(this);
    this.onAllClearClick = this.onAllClearClick.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
    this.onOperatorClick = this.onOperatorClick.bind(this);
    this.onEqualsClick = this.onEqualsClick.bind(this);
    this.onDecimalClick = this.onDecimalClick.bind(this);
    this.onSignClick = this.onSignClick.bind(this);
  }

  calculate(operator) {
    let ans,
      { x, y } = this.state;
    switch (this.state.operator) {
      case '+':
        ans = x + y;
        break;
      case '-':
        ans = x - y;
        break;
      case '/':
        if (y === 0) ans = 'undefined';
        else ans = x / y;
        break;
      case '*':
        ans = x * y;
        break;
      default:
        ans = 'undefined';
    }

    return ans || 'undefined';
  }

  calculateState() {
    this.setState({
      output: '' + this.calculate(),
      cleared: true,
      decimal: false,
      operator: null
    });
  }

  calculateStateWithOp() {
    let ans = this.calculate();
    this.setState({
      output: '' + ans,
      x: ans,
      cleared: true,
      decimal: false,
      operator: this.state.nextOperator,
      nextOperator: null
    });
  }

  onNumberClick(e) {
    console.log('Pressed', e.target.innerHTML);
    if (this.state.cleared) {
      this.setState({
        output: '' + parseInt(e.target.innerHTML, 10),
        cleared: e.target.innerHTML === '0',
        zero: true
      });
    } else if (!this.state.operator) {
      this.setState({
        output: this.state.output + e.target.innerHTML,
        x: null
      });
    } else {
      this.setState({ output: this.state.output + e.target.innerHTML });
    }
  }

  onAllClearClick(e) {
    this.setState({
      cleared: true,
      output: '0',
      decimal: false,
      zero: false,
      operator: null,
      x: null,
      y: null
    });
  }

  onClearClick(e) {
    this.setState({
      cleared: true,
      output: '0',
      decimal: false,
      zero: false
    });
  }

  onOperatorClick(e) {
    console.log('Pressed', e.target.innerHTML);
    if (!this.state.zero && this.state.operator && this.state.cleared) {
      this.setState({
        operator: e.target.innerHTML
      });
    } else if (this.state.operator) {
      this.setState(
        {
          output: '0',
          cleared: true,
          decimal: false,
          nextOperator: e.target.innerHTML,
          y: parseFloat(this.state.output, 10)
        },
        this.calculateStateWithOp
      );
    } else {
      this.setState({
        output: '0',
        cleared: true,
        decimal: false,
        operator: e.target.innerHTML,
        x: parseFloat(this.state.output, 10)
      });
    }
  }

  onEqualsClick(e) {
    console.log('Pressed', e.target.innerHTML);
    if (!this.state.cleared || this.state.zero) {
      this.setState(
        { y: parseFloat(this.state.output, 10) },
        this.calculateState
      );
    }
  }

  onDecimalClick(e) {
    let output;
    if (this.state.cleared) output = '0.';
    else if (!this.state.decimal) output = this.state.output + '.';

    if (output) this.setState({ output, decimal: true, cleared: false });
  }

  onSignClick(e) {
    let output;
    if (this.state.output !== '0') {
      if (this.state.output.charAt(0) === '-') {
        output = this.state.output.slice(1);
      } else {
        output = '-' + this.state.output;
      }
    }

    if (output) this.setState({ output });
  }

  render() {
    console.log(this.state);

    return (
      <Fragment>
        <div className="calculator">
          <input
            type="text"
            id="output"
            className="form-control calc-output"
            value={this.state.output}
            readOnly
          />
          <CalcButton onClick={this.onAllClearClick}>AC</CalcButton>
          <CalcButton onClick={this.onClearClick}>C</CalcButton>
          <CalcButton onClick={this.onSignClick}>- / +</CalcButton>
          <CalcButton onClick={this.onOperatorClick}>/</CalcButton>
          <CalcButton onClick={this.onNumberClick}>7</CalcButton>
          <CalcButton onClick={this.onNumberClick}>8</CalcButton>
          <CalcButton onClick={this.onNumberClick}>9</CalcButton>
          <CalcButton onClick={this.onOperatorClick}>*</CalcButton>
          <CalcButton onClick={this.onNumberClick}>4</CalcButton>
          <CalcButton onClick={this.onNumberClick}>5</CalcButton>
          <CalcButton onClick={this.onNumberClick}>6</CalcButton>
          <CalcButton onClick={this.onOperatorClick}>-</CalcButton>
          <CalcButton onClick={this.onNumberClick}>1</CalcButton>
          <CalcButton onClick={this.onNumberClick}>2</CalcButton>
          <CalcButton onClick={this.onNumberClick}>3</CalcButton>
          <CalcButton onClick={this.onOperatorClick}>+</CalcButton>
          <CalcButton onClick={this.onNumberClick} wide>
            0
          </CalcButton>
          <CalcButton onClick={this.onDecimalClick}>.</CalcButton>
          <CalcButton onClick={this.onEqualsClick}>=</CalcButton>
        </div>
      </Fragment>
    );
  }
}

export default Calculator;
