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
      login: build.mutation<
        { access_token: string; token_type: string },
        LoginRequest
      >({
        query: (body) => ({
          url: "/auth/login",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Auth"],

        onQueryStarted: async (_, { queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled;
            if (data && data.access_token) {
              console.log("Salvando token da API:", data.access_token);
              saveTokenToStorage(data.access_token);
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
      getCurrentUser: build.query<User, number>({
        query: (id) => ({
          url: "/user/data",
          method: "GET",
          params: { id },
        }),
        providesTags: ["Auth"],
      }),
    }),
  });

export const { useLoginMutation, useRegisterMutation, useGetCurrentUserQuery } =
  authApi;
