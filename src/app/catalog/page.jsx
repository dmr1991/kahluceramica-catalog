// src/app/catalog/page.jsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import CatalogClient from "@/components/CatalogClient";
import { getProducts } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export default async function CatalogoPage() {
  // Traemos los datos de Sanity en el servidor para que cargue rápido
  const initialProducts = await getProducts();

  return (
    <main className="min-h-screen bg-arena text-carbon flex flex-col justify-between">
      <div>
        <Navbar />
        <CatalogClient initialProducts={initialProducts} />
      </div>

      {/* Banner a Piezas Bajo Pedido */}
      <section className="w-full py-16 sm:py-20 border-t border-arcilla/15 bg-white/100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-carbon/70 mb-3">
            Producción artesanal por encargo
          </p>
          <h3 className="text-2xl sm:text-3xl font-serif italic mb-4">
            ¿Buscas una pieza del catálogo fijo de Kahlu Cerámica?
          </h3>
          <p className="text-xs sm:text-sm text-carbon/75 font-light max-w-md mx-auto leading-relaxed mb-6">
            Conoce nuestra colección permanente de estilos disponibles para
            producción bajo encargo, siguiendo los tiempos de producción de la cerámica.
          </p>
          <Link
            href="/bajo-pedido"
            className="inline-flex items-center gap-2 border bg-terracota text-white border-carbon/30 px-6 py-3 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase hover:bg-carbon hover:text-arena transition-all rounded-sm"
          >
            Ver piezas bajo pedido
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="border-t border-stone-100 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-carbon-400">
            © 2026 KAHLU CERÁMICA
          </p>
          <div className="flex items-center gap-6 text-[10px] tracking-widest uppercase text-carbon-400">
            <a
              href="mailto:kahluceramica@gmail.com"
              className="hover:text-stone-400 transition-colors"
            >
              Email
            </a>
            <a
              href="https://instagram.com/kahluceramica"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-400 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}