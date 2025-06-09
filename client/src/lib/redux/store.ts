"use client";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import api from "@/services/base/api";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (typeof api.middleware === "function") {
      return getDefaultMiddleware().concat(api.middleware);
    }

    return getDefaultMiddleware();
  },
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
