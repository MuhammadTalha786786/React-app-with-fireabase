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
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';


const RegisterUser = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [image, setImage] = React.useState();
  const [userNumber, setUserNumber] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }


    onFirebaseUpload()



   }


   const onFirebaseUpload = async () =>{
    const storage = firebase.storage();

    // var storageRef = firebase.storage().ref;
    // storageRef.put(image).a((snapshot) => {
    //   console.log('Uploaded a blob or file!');
    // });


    console.log("calling")

    // let fileName = `${uuidv4()}${image.substr(
    //   image.lastIndexOf('.'),
    // )}`;
    const path = `/images/${image}`;
    const ref = storage.ref(path);
     await ref.put(image);
     console.log('uploaded',".....")
    const url = await ref.getDownloadURL();
  
   }


  const theme = createTheme();

  console.log(image, 'image');

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
                onChange={onImageChange}              />

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
                InputProps={{
                  inputMode: 'numeric',
                  maxLength: 12,
                  pattern: '[0-9]*',
                }}
              />

              <div className='my-3'>
                <Button
                  text={loading ? <CircularProgress size={20} /> : 'Register'}
                  type='button'
                  onClick={onFirebaseUpload}
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
