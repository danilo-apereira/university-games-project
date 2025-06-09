"use client";

import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  exp?: number;
  iat?: number;
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;

  const expirationTime = payload.exp * 1000;
  const now = Date.now();

  return now >= expirationTime;
};

export const getTokenFromStorage = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
};

export const saveTokenToStorage = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth_token", token);
};

export const removeTokenFromStorage = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_token");
};

export const getUserIdFromToken = (): number | null => {
  const token = getTokenFromStorage();
  if (!token) return null;

  const payload = decodeToken(token);
  if (!payload || !payload.id) return null;

  const userId =
    typeof payload.id === "number" ? payload.id : parseInt(payload.id, 10);
  return isNaN(userId) ? null : userId;
};
