"use client";

import { useGetGamesQuery } from "@/services/gamesApi";
import GameCard from "@/components/games/GameCard";
import { useState, useEffect } from "react";

export default function Home() {
  const {
    data: games = [],
    isLoading,
    error,
  } = useGetGamesQuery(undefined, { refetchOnMountOrArgChange: true });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isLoading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="bg-red-100 p-4 rounded-md text-red-800 text-center">
          Ocorreu um erro ao carregar os jogos. Tente novamente mais tarde.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Catálogo de Jogos</h1>

      {games.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Nenhum jogo encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
