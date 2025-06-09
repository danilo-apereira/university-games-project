"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export default function ImageUploader({
  onFileSelect,
  selectedFile,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      onFileSelect(file);

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxSize: 5242880,
    multiple: false,
  });

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25 hover:border-primary/50"
            }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Solte a imagem aqui...</p>
          ) : (
            <div className="space-y-2">
              <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
              <p className="text-sm text-muted-foreground">
                (Apenas uma imagem, máximo 5MB)
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="Prévia da imagem"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={removeImage}
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {selectedFile && (
        <p className="text-sm text-muted-foreground">
          Arquivo selecionado: {selectedFile.name} (
          {(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
        </p>
      )}
    </div>
  );
}
