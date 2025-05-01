

import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';  // Adjust according to your file structure

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});