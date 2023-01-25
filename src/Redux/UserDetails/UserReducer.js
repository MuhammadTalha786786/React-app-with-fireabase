import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  isAdmin:false,
  userRole:"Admin",
  userInfo:Object
   // for monitoring the registration process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
        state.isLogin = action.payload.isLogin;
        state.isAdmin = action.payload.isAdmin;
        state.userRole = action.payload.userRole;
    },

    setUserInfo:(state, action)=> {
      state.userInfo = action.payload.userInfo;
      

    }

  },
});

export const { setSignIn,setUserInfo} = authSlice.actions;


export default authSlice.reducer;
