import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import '../App.css';
import { useSelector } from 'react-redux';

function Header() {
  const appState = useSelector((state) => state.auth);

  return (
    <div>
      <nav
        className='navbar navbar-expand-lg navbar-light fontFamily'
        style={{ backgroundColor: '#041f20' }}
      >
        <div className='container-fluid'>
          <img
            className='rounded float-left img-responsive img-fluid'
            height='50px'
            width='50px'
            src={logo}
            alt='new   '
          />

          <Link className='navbar-brand text-white' to='/'></Link>
          <button
            style={{ backgroundColor: 'white' }}
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'>
              {' '}
              <i class='fas fa-bars'></i>
              <i
                class='fa fa-navicon'
                style={{ color: 'white', fontSize: '20px' }}
              ></i>
            </span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link
                  className='nav-link active text-white'
                  aria-current='page'
                  to='/'
                >
                  Home
                </Link>
              </li>
              {!appState.isLogin ? (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='/Login'>
                      Admin Login
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link text-white' to='/userlogin'>
                      User Login
                    </Link>
                  </li>
                </>
              ) : null}

              <li className='d-flex '>
                {appState.isLogin && (  
                  <div >
                   
                      <button color='inherit' onClick={() => {}}>
                        Logout
                      </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
