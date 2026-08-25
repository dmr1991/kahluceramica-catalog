// src/app/catalog/page.tsx
import Navbar from "@/components/Navbar";
import CatalogClient from "@/components/CatalogClient";
import { getProducts } from "@/sanity/lib/queries";

export default async function CatalogoPage() {
  // Traemos los datos de Sanity en el servidor para que cargue rápido
  const initialProducts = await getProducts();

  return (
    <main className="min-h-screen bg-arena text-carbon flex flex-col justify-between">
      <div>
        <Navbar />
        <CatalogClient initialProducts={initialProducts} />
      </div>

      {/* Footer Simple */}
      <footer className="border-t border-arcilla/40 py-16 bg-white/100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-arcilla">
            © 2026 Kahlu Cerámica
          </p>
          <div className="flex items-center gap-8 text-[10px] tracking-widest uppercase text-arcilla">
            <a
              href="mailto:kahluceramica@gmail.com"
              className="hover:text-carbon transition-colors"
            >
              Email
            </a>
            <a
              href="https://instagram.com/kahluceramica"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-carbon transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
