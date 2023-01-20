import React from 'react';

const Button = (props) => {
  return (
    <>
      <button {...props} onClick={props.onClick}>
        {props?.icon ? props.icon : null} {props.text}{' '}
      </button>
    </>
  );
};

export default Button;
