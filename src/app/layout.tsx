import type { Metadata } from "next";
import "./globals.css";
import { Cormorant_Garamond, Raleway } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-body",
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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
