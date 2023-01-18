import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../UserDetails/UserReducer'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig, UserReducer)

const store = configureStore({
  reducer: {
    auth: persistedReducer
  }
})
export const persistor = persistStore(store)
export default store