// src/store/heroSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isfavBtn: false,
  input: '',
  filterInput: '',
  isSearch: false,
  hoveredItem: null,
  removeAnimate: null,
  heroArr: [],
  currentArr: [],
};

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setIsFavBtn(state, action) {
      state.isfavBtn = action.payload;
    },
    setInput(state, action) {
      state.input = action.payload;
    },
    setFilterInput(state, action) {
      state.filterInput = action.payload;
    },
    setIsSearch(state, action) {
      state.isSearch = action.payload;
    },
    setHoveredItem(state, action) {
      state.hoveredItem = action.payload;
    },
    setRemoveAnimate(state, action) {
      state.removeAnimate = action.payload;
    },
    setHeroArr(state, action) {
      state.heroArr = action.payload;
    },
    setCurrentArr(state, action) {
      state.currentArr = action.payload;
    },
  },
});

export const {
  setIsFavBtn,
  setInput,
  setFilterInput,
  setIsSearch,
  setHoveredItem,
  setRemoveAnimate,
  setHeroArr,
  setCurrentArr,
} = heroSlice.actions;

export const selectHeroArr = (state) => state.hero.heroArr;
export const selectCurrentArr = (state) => state.hero.currentArr;

export default heroSlice.reducer;
