import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import '../../../../Styles/StyleGuide.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Input from '../../../../Components/Input/Input';
import Button from '../../../../Components/button/Button';
import { StyleGuide } from '../../../../Components/StyleGuide';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import FacebookLogin from 'react-facebook-login';
import { db } from '../../../../Components/firebase';
import { setUserInfo } from '../../../../Redux/UserDetails/UserReducer';
import useLogin from './useLogin';

const UserLogin = () => {

  const {
    email,
    setEmail,
    setPassword,
    password,
    handleClose,
    handleSubmit,
    theme,
    loading,
    message,
    SignIn, open
  } = useLogin()
  
  return (
    <ThemeProvider theme={theme}>
      <Container component='main'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
            <LockOutlinedIcon />
          </Avatar>
          <h1
            className='fontFamily'
            style={{ color: StyleGuide.color.primary }}
          >
            User Sign in
          </h1>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Input
              value={email}
              setValue={setEmail}
              variant='outlined'
              fullWidth
              margin='normal'
              placeholder='Email'
            />
            <Input
              value={password}
              setValue={setPassword}
              variant='outlined'
              name='password'
              type='password'
              fullWidth
              margin='normal'
              placeholder='Password'
            />
            <div className='my-3'>
              <Button
                text={loading ? <CircularProgress size={20} /> : 'Sign in'}
                type='submit'
                style={{
                  backgroundColor: StyleGuide.color.color3,
                  color: StyleGuide.color.color5,
                }}
                class='button1 btn btn-lg btn-block fontFamily w-100'
              />
            </div>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  <p className='fontFamily extafont'>Forgot password?</p>
                </Link>
              </Grid>
              <Grid item>
                <Link to='/registerUser' aria-current='page'>
                  <p className='fontFamily extafont'>
                    Don't have an account? Sign Up?
                  </p>
                </Link>
              </Grid>
            </Grid>
            <Grid className='mt-5 text-center fontFamily'>
              <h5>Or Sign In With</h5>
            </Grid>
            <Divider className='mt-4' />
            <Button
              text={'Sign In With Google'}
              class='mt-4 button1 btn btn-lg btn-block fontFamily w-100'
              style={{
                backgroundColor: '#FFA500',
                color: StyleGuide.color.color4,
              }}
              onClick={SignIn}
              icon={<GoogleIcon className='mr-3' />}
            />
          </Box>
        </Box>

        <div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity='error'
              sx={{ width: '100%' }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default UserLogin;
