import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/sanity/lib/queries"; // Importamos la conexión

export default async function Home() {
  // Traemos los productos reales de Sanity
  const allProducts = await getProducts();

  // Filtramos usando los campos que configuramos en el esquema
  const featured = allProducts.filter((p: any) => p.isFeatured);
  const newPieces = allProducts.filter((p: any) => p.isNew);

  return (
    <div className="min-h-screen">
      <Navbar /> {/* Asegúrate de que el Navbar esté aquí si lo necesitas */}
      {/* Hero - El diseño elegante de KAHLU */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/1_HERO_2026.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <p className="text-xs md:text-sm tracking-[0.5em] uppercase mb-4 opacity-80">
            Cerámica artesanal
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.2em] mb-6 font-serif">
            KAHLU
          </h1>
          <p className="text-sm md:text-base font-light tracking-wider max-w-md mx-auto mb-10 opacity-90">
            Piezas únicas hechas a mano, donde la tierra se transforma en arte
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-3 border border-white/60 px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-white/10 transition-colors"
          >
            Explorar catálogo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      {/* Colección Destacada - Datos de Sanity */}
      <ProductSection
        title="Colección Destacada"
        subtitle="Lo mejor de nuestro taller"
        products={featured.slice(0, 4)}
        linkTo="/catalog"
      />
      {/* Divider quote - Estética artesanal */}
      <section className="py-20 md:py-28 bg-stone-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl font-light italic leading-relaxed text-stone-600 font-serif">
            "Cada pieza lleva consigo la huella del fuego, la paciencia del
            torno y la intención de quien la crea."
          </p>
        </div>
      </section>
      {/* Nuevas Piezas - Datos de Sanity */}
      <ProductSection
        title="Nuevas Piezas"
        subtitle="Recién salidas del horno"
        products={newPieces.slice(0, 4)}
        linkTo="/catalog"
      />
      {/* CTA final */}
      <section className="py-20 md:py-28 bg-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light mb-4 font-serif text-stone-800">
            Todas las piezas disponibles
          </h2>
          <p className="text-stone-500 text-sm mb-8 max-w-md mx-auto">
            Explora nuestro catálogo completo y encuentra la pieza perfecta para
            tu espacio
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-3 bg-stone-800 text-white px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-stone-700 transition-colors"
          >
            Ver catálogo completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      {/* Footer minimalista */}
      <footer className="border-t border-stone-100 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400">
            © 2026 KAHLU CERÁMICA
          </p>
          <div className="flex items-center gap-6 text-[10px] tracking-widest uppercase text-stone-400">
            <a
              href="mailto:kahluceramica@gmail.com"
              className="hover:text-stone-800 transition-colors"
            >
              Email
            </a>
            <a
              href="https://instagram.com/kahluceramica"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-800 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
