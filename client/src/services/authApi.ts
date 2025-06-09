"use client";

import { User, LoginRequest, RegisterRequest } from "@/models/auth";
import { saveTokenToStorage } from "@/utils/jwt";

import api from "./base/api";

export const authApi = api
  .enhanceEndpoints({
    addTagTypes: ["Auth"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      login: build.mutation<{ user: User; token: string }, LoginRequest>({
        query: (body) => ({
          url: "/auth/login",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Auth"],

        onQueryStarted: async (_, { queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled;
            if (data && data.token) {
              saveTokenToStorage(data.token);
            }
          } catch (error) {
            console.error("Erro ao salvar token:", error);
          }
        },
      }),
      register: build.mutation<void, RegisterRequest>({
        query: (body) => ({
          url: "/auth/register",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Auth"],
      }),
      getCurrentUser: build.query<User, void>({
        query: () => ({
          url: "/users/data",
          method: "GET",
        }),
        providesTags: ["Auth"],
      }),
    }),
  });

export const { useLoginMutation, useRegisterMutation, useGetCurrentUserQuery } =
  authApi;
