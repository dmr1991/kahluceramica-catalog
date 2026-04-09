"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// Definimos las propiedades para Next.js
interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string; // En Next.js usamos href, no to
  activeClassName?: string;
  className?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, href, ...props }, ref) => {
    const pathname = usePathname();

    // Lógica para saber si el link está activo:
    // Es activo si la ruta actual es exactamente igual al href,
    // o si estamos en una subruta (ej: /product/123 activa el link de /product)
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(href));

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
