"use client";

import { GameRating, Games } from "@/models/games";
import api from "./base/api";

export interface CreateGamePayload {
  title: string;
  producer: string;
  genre: string;
  rating?: number;
  image_path: string;
}

export interface RateGamePayload {
  user_nickname: string;
  game_id: number;
  rating: number;
  comment: string;
}

export interface UpdateRatingPayload {
  user_nickname: string;
  game_id: number;
  rating: number;
  comment: string;
}

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
    createGame: build.mutation<Games, CreateGamePayload>({
      query: (body) => ({
        url: "/games",
        method: "POST",
        body,
      }),
    }),
    rateGame: build.mutation<{ success: boolean }, RateGamePayload>({
      query: (body) => ({
        url: "/rating/rate-game",
        method: "POST",
        body,
      }),
    }),
    uploadGameImage: build.mutation<
      { success: boolean },
      { gameId: number; formData: FormData }
    >({
      query: ({ gameId, formData }) => ({
        url: `/games/${gameId}/upload-image`,
        method: "POST",
        body: formData,
      }),
    }),
    deleteGame: build.mutation<{ success: boolean }, number>({
      query: (gameId) => ({
        url: `/games/${gameId}`,
        method: "DELETE",
      }),
    }),
    updateRating: build.mutation<{ success: boolean }, UpdateRatingPayload>({
      query: (body) => ({
        url: `/rating/update-rating/${body.game_id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetGamesQuery,
  useGetGameDetailQuery,
  useGetGameRatingQuery,
  useCreateGameMutation,
  useRateGameMutation,
  useUploadGameImageMutation,
  useDeleteGameMutation,
  useUpdateRatingMutation,
} = gamesApi;
