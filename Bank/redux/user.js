import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  loggedIn: false,
  user: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    logout: state => {
      state.loggedIn = false;
      state.user = undefined;
    },
  },
});

export const {login, logout, updateUser} = userSlice.actions;
export default userSlice.reducer;
