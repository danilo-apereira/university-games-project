"use client";

import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { routes } from "@/routes";
import { useGetCurrentUserQuery } from "@/services/authApi";
import { removeTokenFromStorage, getUserIdFromToken } from "@/utils/jwt";
import { useRouter } from "next/navigation";

interface MenuProps {
  links: { href: string; label: string; onClick?: () => void }[];
  className?: string;
}

const Menu = ({ links, className }: MenuProps) => (
  <NavigationMenu className="flex-none">
    <NavigationMenuList>
      <NavigationMenuItem className={className}>
        {links.map(({ href, label, onClick }) => (
          <NavigationMenuLink key={href} href={href} onClick={onClick}>
            {label}
          </NavigationMenuLink>
        ))}
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const userId = isClient ? getUserIdFromToken() : null;

  if (isClient) {
    console.log("Token decoded - userId:", userId);
    console.log("Token from storage:", localStorage.getItem("auth_token"));
  }

  const { data: user } = useGetCurrentUserQuery(userId || 0, {
    skip: !isClient || userId === null,
  });
  const router = useRouter();

  console.log("User data from API:", user);
  const isAuthenticated = !!user;

  const handleLogout = () => {
    removeTokenFromStorage();
    router.push(routes.public.home);
    window.location.reload();
  };

  const homeLinks = [
    { href: routes.public.home, label: "Home" },
    ...(isAuthenticated
      ? [{ href: routes.public.createGame, label: "Criar jogo" }]
      : []),
  ];

  const authLinks = [
    isAuthenticated
      ? { href: "#", label: "Sair", onClick: handleLogout }
      : { href: routes.guest.auth.login, label: "Acesso" },
  ];

  return (
    <div className="w-full bg-foreground text-background rounded-md">
      <div className="flex justify-between items-center w-full px-4 py-2">
        <Menu links={homeLinks} className="flex flex-row gap-4" />

        <NavigationMenu className="flex-none">
          <NavigationMenuList>
            <NavigationMenuItem>
              {authLinks.map(({ href, label, onClick }) => (
                <NavigationMenuLink key={href} href={href} onClick={onClick}>
                  {label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
