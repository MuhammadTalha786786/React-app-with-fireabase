import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../../Styles/StyleGuide.css';
import firebase from 'firebase';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { setSignIn } from '../../../Redux/UserDetails/UserReducer';
import { useNavigate } from 'react-router-dom';
import Input from '../../../Components/Input/Input';
import Button from '../../../Components/button/Button';
import { StyleGuide } from '../../../Components/StyleGuide';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import useGoogleSignIn from '../../../Utils/GoogleSignIn';
const UserLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = createTheme();
  const { SignIn } = useGoogleSignIn();

  const handleClose = (event) => {
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    console.log('login.....loading');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setLoading(true);
        dispatch(setSignIn({ isLogin: true, isAdmin: true }));
        navigate('/ViewUser', { replace: true });
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        setMessage(errorMessage);
        setOpen(true);
      });
  };
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
          <Box component='form' onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
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
                class='button1 btn btn-lg btn-block fontFamily'
              />
            </div>

            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  <p  className='fontFamily extafont'>Forgot password?</p>
                </Link>
              </Grid>
              <Grid item>
                <Link to='/registerUser' aria-current='page'>
                <p  className='fontFamily extafont'>Don't have an account? Sign Up?</p>
                </Link>
              </Grid>
            </Grid>
            <Grid className='mt-5 text-center fontFamily'>
              <h5>Or Sign In With</h5>
            </Grid>
            <Divider className='mt-4' />
            <Button
              text={'Sign In With Google'}
              class='mt-4 button1 btn btn-lg btn-block fontFamily'
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
