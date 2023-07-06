import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { userApiSlice } from "./slices/userApiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
