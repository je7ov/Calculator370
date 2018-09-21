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
      y: null,
      debugging: false
    };

    this.onKeyDown = this.onKeyDown.bind(this);
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

  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown(e) {
    const numRegex = /^\d+$/;
    const opRegex = /^[+|\-|*|/]$/;
    if (e.shiftKey && e.ctrlKey && e.altKey) {
      if (e.code === 'Slash') {
        this.setState({ debugging: !this.state.debugging });
      }
    } else if (e.shiftKey) {
      if (e.code === 'Minus') {
        this.onSignClick();
      } else if (e.key.match(opRegex)) {
        this.onOperatorClick(e.key);
      }
    } else {
      if (e.key.match(numRegex)) {
        this.onNumberClick(parseInt(e.key, 10));
      } else if (e.key.match(opRegex)) {
        this.onOperatorClick(e.key);
      } else if (e.key === '.') {
        this.onDecimalClick();
      } else if (e.key === 'Enter') {
        this.onEqualsClick();
      } else if (e.key === 'Delete') {
        this.onAllClearClick();
      } else if (e.key === 'Backspace') {
        this.onClearClick();
      }
    }
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
        ans = this.state.output;
    }

    if (isNaN(ans)) return 'undefined';
    else return ans;
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

  onNumberClick(num) {
    if (this.state.cleared) {
      this.setState({
        output: '' + num,
        cleared: num === 0,
        zero: true
      });
    } else if (!this.state.operator) {
      this.setState({
        output: this.state.output + num,
        x: null
      });
    } else {
      this.setState({ output: this.state.output + num });
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

  onOperatorClick(operator) {
    if (this.state.zero && this.state.operator && this.state.cleared) {
      this.setState({
        operator
      });
    } else if (this.state.operator && this.state.zero) {
      this.setState(
        {
          cleared: true,
          decimal: false,
          nextOperator: operator,
          y: parseFloat(this.state.output, 10)
        },
        this.calculateStateWithOp
      );
    } else {
      this.setState({
        cleared: true,
        decimal: false,
        operator,
        x: parseFloat(this.state.output, 10)
      });
    }
  }

  onEqualsClick(e) {
    if (!this.state.cleared || !this.state.zero) {
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
    if (!this.state.output.match(/^0\.?0*$/)) {
      if (this.state.output.charAt(0) === '-') {
        output = this.state.output.slice(1);
      } else {
        output = '-' + this.state.output;
      }
    }

    if (output) this.setState({ output });
  }

  render() {
    let stateArr = [];
    for (let prop in this.state) {
      stateArr.push(prop);
      stateArr.push(this.state[prop]);
    }

    return (
      <Fragment>
        <div className="debug-text">
          {this.state.debugging
            ? stateArr.map((prop, i) => {
                if (i % 2 === 0)
                  return (
                    <h4 key={i} className="text-right">
                      {prop}
                    </h4>
                  );
                else
                  return (
                    <p key={i} className="text-right">
                      {String(prop)}
                    </p>
                  );
              })
            : null}
        </div>

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
          <CalcButton onClick={() => this.onOperatorClick('/')}>/</CalcButton>
          <CalcButton onClick={() => this.onNumberClick(7)}>7</CalcButton>
          <CalcButton onClick={() => this.onNumberClick(8)}>8</CalcButton>
          <CalcButton onClick={() => this.onNumberClick(9)}>9</CalcButton>
          <CalcButton onClick={() => this.onOperatorClick('*')}>*</CalcButton>
          <CalcButton onClick={() => this.onNumberClick(4)}>4</CalcButton>
          <CalcButton onClick={() => this.onNumberClick(5)}>5</CalcButton>
          <CalcButton onClick={() => this.onNumberClick(6)}>6</CalcButton>
          <CalcButton onClick={() => this.onOperatorClick('-')}>-</CalcButton>
          <CalcButton onClick={() => this.onNumberClick(1)}>1</CalcButton>
          <CalcButton onClick={() => this.onNumberClick(2)}>2</CalcButton>
          <CalcButton onClick={() => this.onNumberClick(3)}>3</CalcButton>
          <CalcButton onClick={() => this.onOperatorClick('+')}>+</CalcButton>
          <CalcButton onClick={() => this.onNumberClick(0)} wide>
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
