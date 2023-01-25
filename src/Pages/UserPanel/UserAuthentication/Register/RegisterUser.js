import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../../../Styles/StyleGuide.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../../../../Components/Input/Input';
import Button from '../../../../Components/button/Button';
import { StyleGuide } from '../../../../Components/StyleGuide';
import CircularProgress from '@mui/material/CircularProgress';
import firebase from 'firebase';
import { v4 } from 'uuid';
import { db } from '../../../../Components/firebase';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import PhoneIcon from '@mui/icons-material/Phone';
import './Register.css';

const RegisterUser = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [userNumber, setUserNumber] = React.useState('');
  const [imageToUpload, setImageToUpload] = React.useState('');
  const [userImage, setUserImage] = React.useState('');
  const [name, setName] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isErrorMessage, setIsErrorMesssage] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onImageChange = (event) => {
    setImageToUpload(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
    onFirebaseUpload();
  };

  const writeUserData = (id) => {
    db.collection('users')
      .doc(id)
      .set({
        email: email,
        name: name,
        userImage: userImage,
        phoneNumber: userNumber,
      })
      .then((data) => {
        setLoading(false);
        console.log('data added', data);
      });
  };

  const RegiserUser = async () => {
    if (image == null) {
      setOpen(true);
      setMessage('Choose your image!');
    } else if (name == '') {
      setOpen(true);
      setMessage('Enter your name!');
    } else if (email == '') {
      setOpen(true);
      setMessage('Enter your email!');
    } else if (userNumber == '') {
      setOpen(true);
      setMessage('Enter your number!');
    } else if (password == '') {
      setOpen(true);
      setMessage('Enter your password!');
    } else {
      setLoading(true);
      onFirebaseUpload();

      var userCreated = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (userCreated) {
        writeUserData(userCreated.user.uid);
      }
    }
  };

  const onFirebaseUpload = async () => {
    const storage = firebase.storage();
    console.log('calling');
    const path = `/images/${imageToUpload.name + v4()}`;
    const ref = storage.ref(path);
    await ref.put(imageToUpload);
    console.log('uploaded', '.....');
    const url = await ref.getDownloadURL();
    setUserImage(url);
  };
  const theme = createTheme();

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
                  alt='User Avatar Image'
                  src={
                    image == undefined
                      ? 'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113__340.png'
                      : image
                  }
                  sx={{ width: 56, height: 56 }}
                />
                <p className='fontFamily '>
                  {image == undefined ? 'Please Choose Image' : null}
                </p>
              </Box>

              <input
                type='file'
                // accept='image/*'
                // variant='outlined'
                fullWidth
                onChange={onImageChange}
              />

              <Input
                value={name}
                setValue={setName}
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='Enter your name'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />

              <Input
                value={email}
                setValue={setEmail}
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='Email'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Input
                value={password}
                setValue={setPassword}
                variant='outlined'
                name='password'
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin='normal'
                placeholder='Password'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  inputMode: 'numeric',
                  maxLength: 12,
                  pattern: '[0-9]*',
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <div className='my-3'>
                <Button
                  text={loading ? <CircularProgress size={20} /> : 'Register'}
                  type='button'
                  onClick={RegiserUser}
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
                  <Link to='/UserLogin'>
                    <p className='fontFamily extafont'>
                      Already have an account? Login Here
                    </p>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={isErrorMessage ? 'success' : 'error'}
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
