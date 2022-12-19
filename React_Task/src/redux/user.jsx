import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loggedIn : false,
    email : '',
    firstName : '',
    lastName : ''
} 


export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:   {
        login : (state, action) => {
            state.loggedIn = true
            state.email = action.payload.email 
            state.firstName = action.payload.firstName 
            state.lastName = action.payload.lastName
        },
        logout : (state) => {
            state.loggedIn = false,
            state.email = '' 
            state.firstName = '' 
            state.lastName = ''
        }
    }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer