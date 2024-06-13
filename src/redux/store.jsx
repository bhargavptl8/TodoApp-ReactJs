import { combineReducers, configureStore } from '@reduxjs/toolkit'
import signupReducer from './signupSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
  key: 'TodoSignUp',
  storage,
}

const rootReducer = combineReducers({ 
  signUpData : signupReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck : false
  })
})

export const persistor = persistStore(store)
