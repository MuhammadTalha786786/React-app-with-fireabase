import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  isAdmin:false,
   // for monitoring the registration process.
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignIn: (state, action) => {
        state.isLogin = action.payload.isLogin;
        state.isAdmin = action.payload.isAdmin;
    },

  },
});

export const { setSignIn,} = authSlice.actions;


export default authSlice.reducer;
