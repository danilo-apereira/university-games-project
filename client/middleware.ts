import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "./src/routes";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicRoute =
    Object.values(routes.public).includes(path) || path === "/";
  const isGuestRoute =
    path.startsWith(routes.guest.auth.login) ||
    path.startsWith(routes.guest.auth.register);
  const isJogoRoute = path.startsWith("/jogo/");

  if (isPublicRoute || isGuestRoute || isJogoRoute) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get("auth_token")?.value ||
    request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
