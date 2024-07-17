import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { heroApi } from "./hero_service";

export const store = configureStore({
  reducer: {
    [heroApi.reducerPath]: heroApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(heroApi.middleware),
});
setupListeners(store.dispatch);
