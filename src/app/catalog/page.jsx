import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Catalogo = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">Catálogo</p>
          <h1
            className="text-4xl md:text-5xl font-light tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Todas las piezas
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
