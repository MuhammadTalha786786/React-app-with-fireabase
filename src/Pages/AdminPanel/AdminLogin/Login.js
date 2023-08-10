import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
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


export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const theme = createTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authentication=  useSelector((state)=>state);
  console.log(authentication)

  const handleClose = () => {
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
    
    firebase
    
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setLoading(true);
        dispatch(setSignIn({ isLogin: true, isAdmin: true , userRole:'Admin'}));
        console.log('i am here');
        console.log(window.location);
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
            Admin Sign in
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
              // label='Email'
              variant='outlined'
              fullWidth
              margin='normal'
              placeholder='Email'
            />

            <Input
              value={password}
              setValue={setPassword}
              // label='password'
              variant='outlined'
              name='password'
              type='password'
              fullWidth
              margin='normal'
              placeholder='Password'
            />
            <div className='my-3'>
              <Button
                text={
                  loading ? (
                    <CircularProgress
                      className='mt-2'
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                      }}
                      size={20}
                    />
                  ) : (
                    'Sign in'
                  )
                }
                type='submit'
                style={{
                  backgroundColor: StyleGuide.color.color3,
                  color: StyleGuide.color.color5,
                }}
                className='button1 btn btn-lg btn-block fontFamily w-100'
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
}
