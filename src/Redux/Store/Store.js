import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../UserDetails/UserReducer'
const store = configureStore({
  reducer: {
    auth: UserReducer
  }
})
export default store