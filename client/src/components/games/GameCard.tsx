"use client";

import { Games } from "@/models/games";
import Link from "next/link";
import Image from "next/image";

interface GameCardProps {
  game: Games;
}

export default function GameCard({ game }: GameCardProps) {
  const hasImage = game.image_path && game.image_path !== "null";
  const imageUrl = hasImage
    ? `${process.env.NEXT_PUBLIC_API_URL}${game.image_path}`
    : `${process.env.NEXT_PUBLIC_API_URL}/static/game_images/white_label.png`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:scale-[1.02] flex flex-col">
      <div className="relative w-full h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={`Capa do jogo ${game.title}`}
            className="object-cover hover:scale-105 transition-transform duration-300"
            fill
          />
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{game.title}</h2>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <span className="mr-2">Produtora:</span>
          <span className="font-medium">{game.producer}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span className="mr-2">Gênero:</span>
          <span className="font-medium">{game.genre}</span>
        </div>

        <div className="flex items-center text-sm mb-4">
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center">
            <span className="mr-1">★</span>
            <span>{game.rating}/10</span>
          </div>
        </div>

        <Link
          href={`/jogo/${game.id}`}
          className="inline-block w-full text-center py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}
