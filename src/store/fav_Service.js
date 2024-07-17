// store/favSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favArr: []
};

const favSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favArr.some(fav => fav.id === action.payload.id)) {
        state.favArr.push(action.payload);
      }
    },
    getFavorites: (state) => {
      return state;
    },
    updateFavorite: (state, action) => {
      const index = state.favArr.findIndex(fav => fav.id === action.payload.id);
      if (index !== -1) {
        state.favArr[index] = { ...state.favArr[index], ...action.payload.updates };
      }
    },
    removeFavorite: (state, action) => {
      state.favArr = state.favArr.filter(fav => fav.id !== action.payload.id);
    }
  }
});

export const { addFavorite, getFavorites, updateFavorite, removeFavorite } = favSlice.actions;
export default favSlice.reducer;
