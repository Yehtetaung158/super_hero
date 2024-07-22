// src/store/profileOpen_service.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProfileOpen: false,
};

const heroProfileSlice = createSlice({
  name: "profileOpen",
  initialState,
  reducers: {
    toggleSProfile(state) {
      state.isProfileOpen = !state.isProfileOpen;
    }
  }
});

export const { toggleSProfile } = heroProfileSlice.actions;

// Add this line
export const selectIsProfileOpen = (state) => state.profileOpen.isProfileOpen;

export default heroProfileSlice.reducer;
