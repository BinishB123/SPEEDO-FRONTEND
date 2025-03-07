import {createSlice} from '@reduxjs/toolkit'
import { loginUser } from '../thunk/user.jsx';

const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;


const initialState= {
    userInfo: user ? user : null,
    success: null,
    isLoggedIn: user ? true : false,
    isLoading: false,
    errormessage: "",
    error: false,
    message: ''

};


const userSlice =  createSlice({
    name:"user",
    initialState,
    reducers:{
        reset:(state)=>{
            state.userInfo =   null,
            state.success = null,
            state.isLoggedIn=  false,
            state.isLoading= false,
            state.errormessage= "",
            state.error= false,
            state.message= ''
        },
        resetSuccessAndMessage: (state) => {
            state.message = ""
            state.success = null
        },
        resetErrorAndErrorMessage: (state) => {
            state.error = false
            state.errormessage = ""
        },
        urgentreset: (state) => {
            state.message = ""
            state.success = null
            state.error = false;
            state.errormessage = ""
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.success = true
            state.message ="Logged In"
            state.userInfo = action.payload
            localStorage.setItem("user",JSON.stringify(action.payload))
        }).addCase(loginUser.rejected,(state,action)=>{
            state.error = true
            state.errormessage = action.payload.error
            
        })
    }
})
console.log(userSlice);


console.log(userSlice.reducer);


export const { reset, resetSuccessAndMessage, resetErrorAndErrorMessage, urgentreset } = userSlice.actions;
export default userSlice.reducer;