import {createSlice, nanoid} from '@reduxjs/toolkit';
import AuthStore from './AuthStore';

const initialState = AuthStore;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false 
    }
  },
});

const {login, logout} = authSlice.actions;

export const AuthAction = {
  login,
  logout,
};

export default authSlice.reducer;