"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { isTokenExpired, getTokenFromStorage } from "@/utils/jwt";

interface RootState {
  auth: {
    isAuthenticated: boolean;
    token: string | null;
    user: { id?: string; email?: string; name?: string } | null;
  };
}

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = getTokenFromStorage();
      const isAuthValid =
        isAuthenticated && storedToken && !isTokenExpired(storedToken);

      if (!isAuthValid) {
        router.replace("/auth/login");
      } else {
        setIsVerified(true);
      }
    }
  }, [isAuthenticated, token, router]);

  return isVerified ? <>{children}</> : null;
};

export default ProtectedRoute;
