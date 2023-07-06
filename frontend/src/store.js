import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    // Add the authentication slice reducer to the store's reducers
    auth: authReducer,
    // Add the API slice reducer to the store's reducers
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Concatenate the API slice middleware with the default middleware
    getDefaultMiddleware().concat(apiSlice.middleware),
  // Enable Redux DevTools extension
  devTools: true,
});

export default store;
