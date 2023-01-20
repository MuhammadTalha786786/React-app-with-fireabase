import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../../../Styles/StyleGuide.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { setSignIn } from '../../../../Redux/UserDetails/UserReducer';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import Button from '../../../../Components/button/Button';
import { StyleGuide } from '../../../../Components/StyleGuide';
import CircularProgress from '@mui/material/CircularProgress';

const RegisterUser = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [userNumber, setUserNumber]=React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = createTheme();
  console.log(image,"image")

  const handleClose = (event) => {
    setOpen(false);
  };

  return (
    <>
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
              Register
            </h1>
            <Box component='form' onSubmit={() => {}} noValidate sx={{ mt: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  alt='Remy Sharp'
                  src={
                    image != ''
                      ? image
                      : 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113__340.png'
                  }
                  sx={{ width: 56, height: 56 }}

                />
                <p className='fontFamily '> { image == '' ?  'Please Choose Image': null}</p>
              </Box>

              <input
                type='file'
                accept='image/*'
                variant='outlined'
                fullWidth
                value={image}
                onChange={(x)=>{setImage(x.target.value)}}
              />

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

              <Input
                value={userNumber}
                setValue={setUserNumber}
                variant='outlined'
                name='phone-number'
                type='number'
                fullWidth
                margin='normal'
                placeholder='number'
                maxLength={2}
                InputProps={{ inputMode: 'numeric', maxLength: 12, pattern: '[0-9]*' }}
        
              />

              
              


              <div className='my-3'>
                <Button
                  text={loading ? <CircularProgress size={20} /> : 'Sign in'}
                  type='button'
                  onClick={() => {}}
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
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='#' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
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
    </>
  );
};

export default RegisterUser;
