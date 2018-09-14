import React from 'react';
import classNames from 'classnames';

const CalcButton = props => {
  const btnClass = classNames({
    btn: true,
    'btn-dark': true,
    'calc-btn': true,
    'calc-btn-wide': props.wide
  });
  return (
    <button
      className={btnClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default CalcButton;
