"use client"; // ✅ 1. Esto arregla el error de useEffect

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // ✅ 2. Cambiamos useLocation por usePathname
import Link from "next/link";

const NotFound = () => {
  const pathname = usePathname(); // Aquí tenemos la ruta actual

  useEffect(() => {
    // Esto es lo que Lovable suele poner para registrar errores
    console.error(
      "404 Error: El usuario intentó acceder a la ruta:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="text-6xl font-serif text-carbon mb-4">404</h1>
        <p className="text-xl font-light text-carbon-light mb-8 uppercase tracking-widest">
          Ups! Esta pieza no existe.
        </p>
        <Link
          href="/"
          className="inline-block border border-carbon px-8 py-3 text-xs tracking-widest uppercase hover:bg-carbon hover:text-white transition-all"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;