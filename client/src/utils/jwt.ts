"use client";

import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: string; // usuário ID
  email?: string;
  name?: string;
  role?: string;
  exp?: number; // timestamp de expiração
  iat?: number; // timestamp de emissão
}

/**
 * Decodifica um token JWT e retorna seu payload
 */
export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
};

/**
 * Verifica se o token está expirado
 */
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;
  
  // Convertendo para milissegundos e comparando com o tempo atual
  const expirationTime = payload.exp * 1000;
  const now = Date.now();
  
  return now >= expirationTime;
};

/**
 * Obtém o token do localStorage
 */
export const getTokenFromStorage = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
};

/**
 * Salva o token no localStorage
 */
export const saveTokenToStorage = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth_token", token);
};

/**
 * Remove o token do localStorage
 */
export const removeTokenFromStorage = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_token");
};
