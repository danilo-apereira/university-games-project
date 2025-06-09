"use client";

import { GameRating, Games } from "@/models/games";

import api from "./base/api";

export const gamesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGames: build.query<Games[], void>({
      query: () => ({
        url: "/games",
        method: "GET",
      }),
    }),
    getGameDetail: build.query<Games, number>({
      query: (id) => ({
        url: `/games/${id}`,
        method: "GET",
      }),
    }),
    getGameRating: build.query<GameRating[], number>({
      query: (id) => ({
        url: `/rating/get-rating/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetGamesQuery,
  useGetGameDetailQuery,
  useGetGameRatingQuery,
} = gamesApi;
