import React from 'react';
import TextField from '@mui/material/TextField';

const Input = (props) => {
  return (
    <>
      <TextField
        {...props}
        value={props.value}
        onChange={(x) => props.setValue(x.target.value)}
      />
    </>
  );
};

export default Input;
