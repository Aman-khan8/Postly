import { createSlice } from "@reduxjs/toolkit";


const initialState={
    userCurrentState:false,
    userData:null

}

const authSlice=createSlice({
    name:"AuthenticationFactor",
    initialState,
    reducers:{
        LoginState:(state,action)=>{
            state.userCurrentState=true,
            state.userData=action.payload;
                      
        },
        LogoutState:(state)=>{
            state.userCurrentState=false,
            state.userData=null
        }
    }
})

export default authSlice.reducer;
export const{LoginState,LogoutState}=authSlice.actions;