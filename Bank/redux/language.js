import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  language: 'english',
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage: state => {
      state.language = state.language === 'english' ? 'arabic' : 'english';
    },
  },
});

export const {toggleLanguage} = languageSlice.actions;
export default languageSlice.reducer;
