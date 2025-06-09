"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import useApiMessage from "@/hooks/useApiMessage";
import {
  useCreateGameMutation,
  useUploadGameImageMutation,
} from "@/services/gamesApi";
import ImageUploader from "./components/ImageUploader";

const gameFormSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres.",
  }),
  producer: z.string().min(2, {
    message: "O produtor deve ter pelo menos 2 caracteres.",
  }),
  genre: z.string().min(2, {
    message: "O gênero deve ter pelo menos 2 caracteres.",
  }),
});

type GameFormValues = z.infer<typeof gameFormSchema>;

export default function CriarJogo() {
  const router = useRouter();
  const { showSuccessMessage, showErrorMessage } = useApiMessage();
  const [createGame, { isLoading }] = useCreateGameMutation();
  const [uploadGameImage, { isLoading: isUploading }] =
    useUploadGameImageMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GameFormValues>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      title: "",
      producer: "",
      genre: "",
    },
  });

  const onSubmit = async (data: GameFormValues) => {
    try {
      const gameResponse = await createGame({
        ...data,
        image_path: "",
        rating: 0,
      }).unwrap();

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadResponse = await uploadGameImage({
          gameId: gameResponse.id,
          formData,
        }).unwrap();

        if (!uploadResponse.success) {
          throw new Error("Falha ao fazer upload da imagem");
        }
      }

      showSuccessMessage("Jogo criado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro ao criar jogo:", error);
      showErrorMessage(
        error,
        "Ocorreu um erro ao criar o jogo. Tente novamente."
      );
    }
  };

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Jogo</CardTitle>
          <CardDescription>
            Preencha as informações e faça o upload da imagem do jogo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input placeholder="Digite o título do jogo" {...field} />
                    {errors.title && (
                      <p className="text-sm font-medium text-destructive">
                        {errors.title.message}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      O nome do jogo que será exibido.
                    </p>
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Produtor</label>
              <Controller
                name="producer"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input placeholder="Digite o produtor do jogo" {...field} />
                    {errors.producer && (
                      <p className="text-sm font-medium text-destructive">
                        {errors.producer.message}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      O nome da empresa ou pessoa que produziu o jogo.
                    </p>
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gênero</label>
              <Controller
                name="genre"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input placeholder="Digite o gênero do jogo" {...field} />
                    {errors.genre && (
                      <p className="text-sm font-medium text-destructive">
                        {errors.genre.message}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      O gênero principal do jogo (ex: Ação, Aventura, RPG, etc).
                    </p>
                  </div>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Imagem do Jogo</label>
              <ImageUploader
                onFileSelect={(file: File | null) => setSelectedFile(file)}
                selectedFile={selectedFile}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isUploading}
            >
              {isLoading || isUploading ? "Processando..." : "Criar Jogo"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
