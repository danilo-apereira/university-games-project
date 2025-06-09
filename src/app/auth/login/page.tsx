"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLoginMutation } from "@/services/authApi";
import { jwtDecode } from "jwt-decode";
import { saveTokenToStorage } from "@/utils/jwt";
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
import { routes } from "@/routes";
import useApiMessage from "@/hooks/useApiMessage";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { showSuccessMessage, showErrorMessage } = useApiMessage();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({ identifier, password }).unwrap();
      console.log("Login response:", response);

      if (response && response.access_token) {
        console.log("Salvando token manualmente:", response.access_token);
        saveTokenToStorage(response.access_token);

        try {
          const decoded = jwtDecode(response.access_token);
          console.log("Token decodificado:", decoded);
        } catch (error) {
          console.error("Erro ao decodificar token:", error);
        }
      }

      showSuccessMessage("Login realizado com sucesso");
      router.push(routes.public.home);
    } catch (error) {
      console.error("Erro de login:", error);
      showErrorMessage(
        error,
        "Falha ao fazer login. Verifique suas credenciais."
      );
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>

          <CardDescription className="text-center">
            Entre com suas credenciais para acessar sua conta
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="identifier" className="text-sm font-medium">
                Nickname ou e-mail
              </label>
              <Input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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
          </CardContent>

          <CardFooter className="flex flex-col gap-4 mt-6">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>

            <p className="text-sm text-center">
              Não tem uma conta ainda?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:underline"
              >
                Registre-se
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
