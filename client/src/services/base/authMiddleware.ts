"use client";

import { getTokenFromStorage } from "@/utils/jwt";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  prepareHeaders: (headers) => {
    const token = getTokenFromStorage();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithAuthAndReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQueryWithAuth(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
  }

  return result;
};

export default baseQueryWithAuth;
