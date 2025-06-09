export interface User {
  id: string;
  username: string;
  email: string;
  nickname: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  nickname: string;
  email: string;
  password: string;
}
