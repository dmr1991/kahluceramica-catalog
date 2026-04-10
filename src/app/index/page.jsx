import Link from "next/link"; //
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductSection from "@/components/ProductSection";
import { products } from "@/data/products";

const featured = products.filter((p) => p.isFeatured);
const newPieces = products.filter((p) => p.isNew);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&h=900&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative z-10 text-center text-background px-6">
          <p className="text-xs md:text-sm tracking-[0.5em] uppercase mb-4 opacity-80">Cerámica artesanal</p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.2em] mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            KAHLU
          </h1>
          <p className="text-sm md:text-base font-light tracking-wider max-w-md mx-auto mb-10 opacity-90">
            Piezas únicas hechas a mano, donde la tierra se transforma en arte
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-3 border border-background/60 px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-background/10 transition-colors"
          >
            Explorar catálogo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Colección Destacada */}
      <ProductSection
        title="Colección Destacada"
        subtitle="Lo mejor de nuestro taller"
        products={featured.slice(0, 4)}
        link href="/catalog"
      />

      {/* Divider quote */}
      <section className="py-20 md:py-28 bg-card">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p
            className="text-2xl md:text-3xl font-light italic leading-relaxed text-muted-foreground"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "Cada pieza lleva consigo la huella del fuego, la paciencia del torno y la intención de quien la crea."
          </p>
        </div>
      </section>

      {/* Nuevas Piezas */}
      <ProductSection
        title="Nuevas Piezas"
        subtitle="Recién salidas del horno"
        products={newPieces.slice(0, 4)}
        link href="/catalog"
      />

      {/* CTA - Ver todo */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2
            className="text-3xl md:text-4xl font-light mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Todas las piezas disponibles
          </h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
            Explora nuestro catálogo completo y encuentra la pieza perfecta para tu espacio
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-primary/90 transition-colors rounded-sm"
          >
            Ver catálogo completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            © 2026 Kahlu Cerámica
          </p>
          <div className="flex items-center gap-6 text-xs tracking-widest uppercase text-muted-foreground">
            <a href="mailto:hola@kahluceramica.com" className="hover:text-foreground transition-colors">Email</a>
            <a href="https://instagram.com/kahluceramica" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
