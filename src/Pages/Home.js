import React from 'react'
import { Link } from 'react-router-dom';


const Home = () => {
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
                      to='/Login'
                    >
                      <button
                        type='button'
                        class=' button1 btn btn-primary btn-lg fontFamily'
                      >
                        Admin Login
                      </button>
                    </Link>

                    <Link
                      className='nav-link active text-white'
                      aria-current='page'
                      to='/ViewUser'
                    >
                      <button
                        type='button'
                        class=' button1 btn btn-secondary btn-lg fontFamily'
                      >
                        User Login
                      </button>
                    </Link>
                  </div>
                </div>
    </>
  )
}

export default Home