import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    content: contentReducer,
    auth: authReducer,
  }
});

export default store;
