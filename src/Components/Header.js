import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../Styles/StyleGuide.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSignIn, setUserInfo } from '../Redux/UserDetails/UserReducer';
import { StyleGuide } from './StyleGuide';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

function Header() {
  const appState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      <nav
        className='navbar navbar-expand-lg navbar-light fontFamily'
        style={{ backgroundColor: StyleGuide.color.primary, display: 'flex' }}
      >
        <div className='container-fluid'>
          <h1
            className='text-white'
            style={{
              fontFamily: StyleGuide.fontFamily.bold,
            }}
          >
            SociBea
          </h1>

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
              <i class='fas fa-bars'></i>
              <i
                class='fa fa-navicon'
                style={{ color: 'white', fontSize: '20px' }}
              ></i>
            </span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <>
                {appState?.userRole == 'user' && !appState?.isLogin && (
                  <>
                    <li className='nav-item'>
                      <Link className='nav-link text-white' to={'/userLogin'}>
                        User Login
                      </Link>
                    </li>
                  </>
                )}
              </>

              {appState?.userRole == 'user' && appState?.isLogin && (
                <li className='navcume-item'>
                  <Link className='nav-link text-white' to={'/userHome'}>
                    Home
                  </Link>
                </li>
              )}
            </ul>

            <div>
              {appState.isLogin && (
                <div>
                  <div class='dropdown dropstart'>
                    {/* <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button> */}
                    <img
                      src={appState.userInfo.userImage}
                      alt='user image'
                      className='rounded-circle'
                      id='dropdownMenuButton1'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    />

                    <ul
                      class='dropdown-menu'
                      aria-labelledby='dropdownMenuButton1'
                    >
                      <li>
                        <a class='dropdown-item'>
                          <LogoutOutlinedIcon
                            color='red'
                            size={30}
                            style={{ color: StyleGuide.color.color4 }}
                            data-toggle='modal'
                            data-target='#exampleModal'
                          />
                        </a>
                      </li>
                      <li>
                        <a class='dropdown-item' href='#'>
                          Another action
                        </a>
                      </li>
                      <li>
                        <a class='dropdown-item' href='#'>
                          Something else here
                        </a>
                      </li>
                    </ul>

                    <div
                      class='modal fade'
                      id='exampleModal'
                      tabindex='-1'
                      role='dialog'
                      aria-labelledby='exampleModalLabel'
                      aria-hidden='true'
                    >
                      <div class='modal-dialog' role='document'>
                        <div class='modal-content'>
                          <div class='modal-header'>
                            {/* <h5 class='modal-title' id='exampleModalLabel'>
                          Are you sure you want to log out?
                          </h5> */}
                            <button
                              type='button'
                              class='close'
                              data-dismiss='modal'
                              aria-label='Close'
                            >
                              <span aria-hidden='true'>&times;</span>
                            </button>
                          </div>
                          <div class='modal-body'>
                            <p>Are you sure you want to log out? </p>
                          </div>
                          <div class='modal-footer'>
                            <button
                              type='button'
                              class='btn btn-secondary'
                              data-dismiss='modal'
                            >
                              Close
                            </button>
                            <button
                              type='button'
                              class='btn btn-primary'
                              onClick={() => {
                                dispatch(
                                  setSignIn({
                                    isLogin: false,
                                    isAdmin: false,
                                    userRole: 'Admin',
                                  }),
                                
                               dispatch(setUserInfo({userInfo:{}}))
                                );
                                window.location.replace('/');
                              }}
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
