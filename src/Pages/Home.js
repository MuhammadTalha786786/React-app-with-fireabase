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
            to={'/UserLogin'}
          >
            <Button
              text={ 'User login'}
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
