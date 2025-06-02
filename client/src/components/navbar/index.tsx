import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { routes } from "@/routes";

interface MenuProps {
  links: { href: string; label: string }[];
  className?: string;
}

const Menu = ({ links, className }: MenuProps) => (
  <NavigationMenu className="flex-none">
    <NavigationMenuList>
      <NavigationMenuItem className={className}>
        {links.map(({ href, label }) => (
          <NavigationMenuLink key={href} href={href}>
            {label}
          </NavigationMenuLink>
        ))}
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export default function Navbar() {
  return (
    <div className="w-full bg-foreground text-background rounded-md">
      <div className="flex justify-between items-center w-full px-4 py-2">
        <Menu
          links={[
            { href: routes.public.home, label: "Home" },
            { href: routes.public.catalog, label: "Catálogo Completo" },
            { href: routes.public.rating, label: "Avaliações" },
          ]}
          className="flex flex-row gap-4"
        />

        <Menu links={[{ href: routes.guest.auth.login, label: "Acesso" }]} />
      </div>
    </div>
  );
}
