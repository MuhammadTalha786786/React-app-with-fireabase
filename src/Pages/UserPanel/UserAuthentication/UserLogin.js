import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../../Styles/StyleGuide.css';
import firebase from 'firebase';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setSignIn } from '../../../Redux/UserDetails/UserReducer';
import { useNavigate } from 'react-router-dom';
import Input from '../../../Components/Input/Input';
import Button from '../../../Components/button/Button';
import { StyleGuide } from '../../../Components/StyleGuide';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import FacebookLogin from 'react-facebook-login';
import { db } from '../../../Components/firebase';
import { setUserInfo } from '../../../Redux/UserDetails/UserReducer';

const UserLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const theme = createTheme();
  let navigate = useNavigate();

  const app = useSelector((state) => state);
  console.log(app);

  const responseFacebook = (response) => {

    const userData = {
      email: response.email,
      name: response.name,
      phoneNumber: "",
      userImage: response.picture.data.url,
    };

    dispatch(setUserInfo({ userInfo: userData }));
    dispatch(
      setSignIn({ userRole: 'user', isLogin: true, isAdmin: false })
    );
    navigate('/userHome');
    window.location.reload();
    console.log(response, 'facebook res....v');
  };

  const updateLogin = (uid) => {
    console.log('update login fun called');

    db.collection('users')
      .doc(uid)
      .get()
      .then((snapshot) => {
        console.log(snapshot.data(), 'user data ');
        dispatch(setUserInfo({ userInfo: snapshot.data() }));
        dispatch(
          setSignIn({ userRole: 'user', isLogin: true, isAdmin: false })
        );
        navigate('/userHome');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
      
        // This gives you a Google Access Token. You can use it to access the Google API.

        // The signed-in user info.
        var user = result.user;
        console.log(user);

        if (user) {
          const userData = {
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
            userImage: user.photoURL,
          };

          dispatch(setUserInfo({ userInfo: userData }));
          dispatch(
            setSignIn({ userRole: 'user', isLogin: true, isAdmin: false })
          );
          navigate('/userHome');
          window.location.reload();
        }

        console.log(user.displayName, 'login user using google sign in...');

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
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

    console.log(email);
    console.log('login.....loading');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setLoading(false);
        console.log(userCredential.user.uid);

        updateLogin(userCredential.user.uid);
        // dispatch(setSignIn({ isLogin: true, isAdmin: true }));
        // navigate('/userHome', { replace: true });
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

            <div className='w-100'>
              <FacebookLogin
                appId='3554196954802152'
                autoLoad={false}
                callback={responseFacebook}
                fields='name,email,picture'
                cssClass='mt-4 button1 btn btn-lg btn-block btn-primary fontFamily w-100'
                icon={<FacebookIcon className='mr-3' />}
                textButton='Sign In with Facebook'
              />
            </div>
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
