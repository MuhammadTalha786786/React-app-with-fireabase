import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { StyleGuide } from '../Components/StyleGuide';
import Button from '../Components/button/Button';

const Home = () => {
  const appState = useSelector((state) => state.auth);

  return (
    <>
      <h1 className='text-3xl font-bold underline text-center text-sky-500 mt-5'>
        Welcome To SociBea App
      </h1>
      <div class='my-3 bg-light'>
        <div class='col-md-12 text-center'>
          <Link
            className='nav-link active text-white'
            aria-current='page'
            to={appState.isLogin ? '/ViewUser' : '/Login'}
          >
            <Button
              text={appState.isLogin ? 'View User' : 'Admin Login'}
              type='button'
              style={{
                backgroundColor: StyleGuide.color.color4,
                color: StyleGuide.color.color5,
              }}
              class='button1 btn btn-lg fontFamily'
            />
          </Link>

          <Link
            className='nav-link active text-white'
            aria-current='page'
            to={appState.isLogin ? '/addUser' : '/UserLogin'}
          >
            <Button
              text={appState.isLogin ? 'Add user' : 'User login'}
              type='button'
              style={{
                backgroundColor: StyleGuide.color.color1,
                color: StyleGuide.color.color4,
              }}
              class=' button1 btn  btn-lg fontFamily'
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
