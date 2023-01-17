import React, { useState } from 'react';
import { db } from '../../../Components/firebase';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../../../Styles/StyleGuide.css';

function AddUser() {
  const [name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Cellnumber, setCellnumber] = useState('');
  const [age, setage] = useState('');
  const [open, setOpen] = React.useState(false);
  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event) => {
    setOpen(false);
  };
  const addUser = () => {
    db.collection('users')
      .add({
        name: name,
        Email: Email,
        Cellnumber: Cellnumber,
        age: age,
      })
      .then(() => {
        setOpen(true);
      })
      .catch((err) => {
        alert(err);
      });
    setName();
    setEmail();
    setCellnumber();
    setage();
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const emailExist = await db
      .collection('users')
      .where('Email', '==', Email)
      .get();
    console.log(emailExist.empty);
    if (!emailExist.empty) {
      alert('The Email already existed');
    } else {
      addUser();
    }
    // e.preventDefault();
  };
  return (
    <div className='container my-3'>
      <h3 className='text-center text-primary fontFamily'>Add User</h3>
      <form onSubmit={HandleSubmit}>
        <div className='mb-3'>
          <label htmlFor='title' className='fontFamily form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            required
            placeholder='Enter your name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='fontFamily form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='name@example.com'
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='fontFamily form-label'>
            Cell Number
          </label>
          <input
            type='text'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='Enter your Number '
            value={Cellnumber}
            onChange={(e) => {
              setCellnumber(e.target.value);
            }}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='fontFamily form-label'>
            Age
          </label>
          <input
            type='number'
            className='form-control'
            id='exampleFormControlInput1'
            placeholder='Enter your Age '
            min='18'
            max='60'
            value={age}
            onChange={(e) => {
              setage(e.target.value);
            }}
          />
        </div>

        <div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              This is a success message!
            </Alert>
          </Snackbar>
        </div>

        <div className='d-grid gap-2'>
          <button type='submit' className='btn btn-block btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
