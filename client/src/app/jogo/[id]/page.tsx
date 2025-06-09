"use client";

import {
  useGetGameDetailQuery,
  useGetGameRatingQuery,
  useDeleteGameMutation,
} from "@/services/gamesApi";
import { useGetCurrentUserQuery } from "@/services/authApi";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useApiMessage from "@/hooks/useApiMessage";
import RatingModal from "./components/RatingModal";
import { getUserIdFromToken } from "@/utils/jwt";
import { routes } from "@/routes";

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-medium">Carregando detalhes do jogo...</p>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="p-4 bg-red-100 rounded-lg">
      <p className="text-lg font-medium text-red-800">{message}</p>
    </div>
    <Link href="/" className="mt-4 text-blue-500 underline hover:text-blue-700">
      Voltar para a página inicial
    </Link>
  </div>
);

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showSuccessMessage, showErrorMessage } = useApiMessage();
  const [deleteGame, { isLoading: isDeleting }] = useDeleteGameMutation();

  let gameId = 0;
  if (typeof params?.id === "string") {
    const parsedId = parseInt(params.id, 10);
    if (!isNaN(parsedId) && parsedId > 0) {
      gameId = parsedId;
    }
  }

  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const userId = isClient ? getUserIdFromToken() : null;

  const { data: currentUser } = useGetCurrentUserQuery(userId || 0, {
    skip: !userId,
  });

  const {
    data: game,
    isLoading,
    error,
  } = useGetGameDetailQuery(gameId, {
    refetchOnMountOrArgChange: true,
  });
  const { data: ratings = [] } = useGetGameRatingQuery(gameId, {
    skip: !gameId,
    refetchOnMountOrArgChange: true,
  });

  const userExistingRating =
    currentUser && ratings.length > 0
      ? ratings.find((rating) => rating.user_nickname === currentUser.nickname)
      : null;

  const openRatingModal = () => setIsModalOpen(true);
  const closeRatingModal = () => setIsModalOpen(false);

  const handleDeleteGame = async () => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este jogo? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        await deleteGame(gameId).unwrap();
        showSuccessMessage("Jogo excluído com sucesso!");
        router.push("/");
      } catch (error) {
        console.error("Erro ao excluir jogo:", error);
        showErrorMessage(
          error,
          "Ocorreu um erro ao excluir o jogo. Tente novamente."
        );
      }
    }
  };

  const hasImage = game?.image_path && game.image_path !== "null";
  const imageUrl = hasImage
    ? `https://187.72.95.177:60200${game?.image_path}`
    : `https://187.72.95.177:60200/static/game_images/white_label.png`;

  if (!isClient || isLoading) {
    return <LoadingState />;
  }

  if (error || !game) {
    return (
      <ErrorState message="Ocorreu um erro ao carregar os detalhes do jogo." />
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative w-full h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={`Capa do jogo ${game.title}`}
              className="object-cover hover:scale-105 transition-transform duration-300"
              fill
            />
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">{game.title}</h1>
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
              <span className="mr-1">★</span>
              <span>{game.rating}/10</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-medium text-gray-700">Produtora</h2>
              <p className="text-gray-900">{game.producer}</p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-700">Gênero</h2>
              <p className="text-gray-900">{game.genre}</p>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Detalhes do Jogo</h2>
            <p className="text-gray-700">
              Este é um jogo {game.genre} desenvolvido pela {game.producer}.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
            >
              ← Voltar para a lista de jogos
            </Link>

            {currentUser ? (
              <>
                <Button
                  onClick={openRatingModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  {userExistingRating
                    ? "Editar avaliação"
                    : "Avaliar este jogo"}
                </Button>
                <Button
                  onClick={handleDeleteGame}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-colors"
                >
                  {isDeleting ? "Excluindo..." : "Excluir"}
                </Button>
              </>
            ) : (
              <Link
                href={routes.guest.auth.login}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Faça login para avaliar
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Avaliações</h2>

          {ratings && ratings.length > 0 ? (
            <div className="space-y-4">
              {ratings.map((rating, index) => (
                <div key={`rating-${index}`} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-800">
                      {rating.user_name}
                    </h3>
                    <div className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{rating.rating}/10</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{rating.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p>Ainda não há avaliações para este jogo.</p>
            </div>
          )}
        </div>
      </div>

      {currentUser && (
        <RatingModal
          isOpen={isModalOpen}
          onClose={closeRatingModal}
          gameId={gameId}
          userNickname={currentUser.nickname}
        />
      )}
    </div>
  );
}
