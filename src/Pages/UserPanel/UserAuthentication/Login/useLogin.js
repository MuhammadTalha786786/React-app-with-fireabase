import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setSignIn } from '../../../../Redux/UserDetails/UserReducer';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../../Components/firebase';
import { setUserInfo } from '../../../../Redux/UserDetails/UserReducer';


export default function useLogin() {
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
  
          let loginUser ={
  
            name:snapshot.data()?.name,
            image:snapshot.data()?.image,
            isLogin:true,
            uid:snapshot.data()?.uid,
            phoneNumber:snapshot.data()?.phoneNumber
  
          }
        
  
          
          dispatch(setUserInfo({ userInfo: loginUser }));
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
          console.log(user?.uid, "login user");
  
          if (user) {
            const userData = { 
              email: user?.email,
              name: user?.displayName,
              phoneNumber: user?.phoneNumber,
              image: user?.photoURL,
              isLogin:true,
              uid:user?.uid
            };
  
            dispatch(setUserInfo({ userInfo: userData }));
            dispatch(
              setSignIn({ userRole: 'user', isLogin: true, isAdmin: false })
            );
             navigate('/userHome');   
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



  return{
    email,
    setEmail,
    setPassword,
    password,
    updateLogin,
    handleClose,
    handleSubmit,
    app,
    open,
    setOpen,
    theme,
    loading,
    setLoading,
    message,
    SignIn



  }
  
}
