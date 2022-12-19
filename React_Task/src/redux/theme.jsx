import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    theme: "white"
} 


export const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers:{
        toggleTheme : (state) => {
            if (state.theme === "white")
                state.theme = "dark"
            else state.theme = "white"
        }
    }
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer