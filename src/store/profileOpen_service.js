import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isProfileOpen: false,
};

const heroProfileSlice=createSlice({
    name : "profileOpen",
    initialState,
    reducers:{
        toggleSProfile(state){
            state.isProfileOpen = !state.isProfileOpen;
        }
    }
})
export const{ toggleSProfile}=heroProfileSlice.actions
export default heroProfileSlice.reducer;