"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/models/auth";
import { authApi } from "@/services/authApi";
import {
  getTokenFromStorage,
  removeTokenFromStorage,
  isTokenExpired,
} from "@/utils/jwt";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

if (typeof window !== "undefined") {
  try {
    const storedToken = getTokenFromStorage();
    if (storedToken && !isTokenExpired(storedToken)) {
      initialState.token = storedToken;
      initialState.isAuthenticated = true;
    }
  } catch (error) {
    console.error("Erro ao inicializar o estado de autenticação:", error);
    removeTokenFromStorage();
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeTokenFromStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state) => {
        state.isAuthenticated = true;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
