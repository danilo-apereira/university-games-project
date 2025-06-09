"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegisterMutation } from "@/services/authApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { routes } from "@/routes";
import useApiMessage from "@/hooks/useApiMessage";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const { showSuccessMessage, showErrorMessage } = useApiMessage();

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      await register({ name, nickname, email, password }).unwrap();
      showSuccessMessage("Conta criada com sucesso");
      router.push(routes.guest.auth.login);
    } catch (error) {
      showErrorMessage(error, "Falha ao registrar. Verifique seus dados.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Criar Conta
          </CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para criar sua conta
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome de usuário
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="nickname" className="text-sm font-medium">
                Nickname
              </label>
              <Input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirmar senha
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 mt-6">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrar"}
            </Button>
            <p className="text-sm text-center">
              Já tem uma conta?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:underline"
              >
                Faça login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
