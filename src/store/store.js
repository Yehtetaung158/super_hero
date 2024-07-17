import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { heroApi } from "./hero_service";
import favReducer from './fav_Service';

// Load the initial state for favArr from local storage
const loadFavoritesFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('favorites');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load favorites from local storage", err);
    return undefined;
  }
};

// Save the favArr state to local storage
const saveFavoritesToLocalStorage = (favorites) => {
  try {
    const serializedState = JSON.stringify(favorites);
    localStorage.setItem('favorites', serializedState);
  } catch (err) {
    console.error("Could not save favorites to local storage", err);
  }
};

const preloadedState = {
  favorites: {
    favArr: loadFavoritesFromLocalStorage() || []
  }
};

export const store = configureStore({
  reducer: {
    [heroApi.reducerPath]: heroApi.reducer,
    favorites: favReducer
  },
  preloadedState, // Include preloaded state here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(heroApi.middleware),
});

// Save the favorites state to local storage whenever it changes
store.subscribe(() => {
  saveFavoritesToLocalStorage(store.getState().favorites.favArr);
});

setupListeners(store.dispatch);
export default store;