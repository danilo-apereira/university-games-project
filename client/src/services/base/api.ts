"use client";

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthAndReauth } from "./authMiddleware";

const api = createApi({
  baseQuery: baseQueryWithAuthAndReauth,
  endpoints: () => ({}),
});

export default api;
