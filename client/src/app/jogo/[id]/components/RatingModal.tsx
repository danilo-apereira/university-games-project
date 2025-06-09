"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useRateGameMutation,
  useUpdateRatingMutation,
  useGetGameRatingQuery,
} from "@/services/gamesApi";
import useApiMessage from "@/hooks/useApiMessage";

const ratingFormSchema = z.object({
  rating: z
    .number()
    .min(0, { message: "A classificação deve ser no mínimo 0." })
    .max(10, { message: "A classificação deve ser no máximo 10." }),
  comment: z
    .string()
    .min(3, { message: "O comentário deve ter pelo menos 3 caracteres." })
    .max(500, { message: "O comentário deve ter no máximo 500 caracteres." }),
});

type RatingFormValues = z.infer<typeof ratingFormSchema>;

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: number;
  userNickname: string;
}

const RatingModal: React.FC<RatingModalProps> = ({
  isOpen,
  onClose,
  gameId,
  userNickname,
}) => {
  const [rateGame, { isLoading: isRating }] = useRateGameMutation();
  const [updateRating, { isLoading: isUpdating }] = useUpdateRatingMutation();
  const isLoading = isRating || isUpdating;

  const { data: ratings = [] } = useGetGameRatingQuery(gameId, {
    refetchOnMountOrArgChange: true,
  });

  const existingRating = ratings.find(
    (rating) => rating.user_nickname === userNickname
  );

  const { showSuccessMessage, showErrorMessage } = useApiMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RatingFormValues>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      rating: existingRating ? existingRating.rating : 5,
      comment: existingRating ? existingRating.comment : "",
    },
  });

  const onSubmit = async (data: RatingFormValues) => {
    try {
      const payload = {
        user_nickname: userNickname,
        game_id: gameId,
        rating: data.rating,
        comment: data.comment,
      };

      if (existingRating) {
        await updateRating(payload).unwrap();
        showSuccessMessage("Avaliação atualizada com sucesso!");
      } else {
        await rateGame(payload).unwrap();
        showSuccessMessage("Avaliação enviada com sucesso!");
      }

      reset();
      onClose();
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      showErrorMessage(
        error,
        existingRating
          ? "Ocorreu um erro ao atualizar sua avaliação. Tente novamente."
          : "Ocorreu um erro ao enviar sua avaliação. Tente novamente."
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {existingRating ? "Editar Avaliação" : "Avaliar Jogo"}
          </DialogTitle>
          <DialogDescription>
            Dê uma nota de 0 a 10 e deixe um comentário sobre o jogo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label htmlFor="rating" className="text-sm font-medium">
              Nota (0-10)
            </label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="10"
              step="1"
              {...register("rating", { valueAsNumber: true })}
            />
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Comentário
            </label>
            <Textarea
              id="comment"
              rows={4}
              placeholder="Escreva seu comentário sobre o jogo..."
              {...register("comment")}
            />
            {errors.comment && (
              <p className="text-sm text-red-500">{errors.comment.message}</p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mr-2"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? existingRating
                  ? "Atualizando..."
                  : "Enviando..."
                : existingRating
                ? "Atualizar Avaliação"
                : "Enviar Avaliação"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
