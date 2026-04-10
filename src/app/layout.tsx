import type { Metadata } from "next";
import "./globals.css";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import Navbar from "@/components/Navbar"; // ✅ Importamos la Navbar

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"], // Añadimos pesos para que se vea pro
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kahlu Cerámica",
  description: "Piezas hechas a mano en cerámica.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${raleway.variable}`}>
      {/* ✅ Agregamos la clase font-sans al body para que use Raleway por defecto */}
      <body className="min-h-screen bg-background font-sans antialiased">
        <Navbar /> {/* ✅ Aquí aparece la Navbar en todo el sitio */}
        <main>{children}</main>
      </body>
    </html>
  );
}
