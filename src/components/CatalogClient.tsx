"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";

interface CatalogClientProps {
  initialProducts: any[];
}

const CatalogClient = ({ initialProducts }: CatalogClientProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("recientes");

  // --- CATEGORÍAS DINÁMICAS ---
  const categories = useMemo(() => {
    const cats = initialProducts.map((p) => p.category).filter(Boolean);
    return ["Todas", ...Array.from(new Set(cats))];
  }, [initialProducts]);

  // --- FILTRADO Y ORDENADO ---
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCategory !== "Todas") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortOrder === "precio-menor") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "precio-mayor") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "recientes") {
      // Prioriza los que tengan isNew: true en Sanity
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [selectedCategory, sortOrder, initialProducts]);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      {/* Encabezado */}
      <div className="mb-12">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-carbon mb-2">
          Catálogo
        </p>
        <h1
          className="text-4xl md:text-5xl font-light tracking-wide text-stone-800"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Todas las piezas
        </h1>
      </div>

      {/* Barra de Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 pb-8">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-sans text-[10px] tracking-[0.2em] uppercase transition-all ${
                selectedCategory === cat
                  ? "text-carbon border-b border-stone-800 pb-1"
                  : "text-carbon-light hover:text-agua"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-carbon">
            Organizar:
          </span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-transparent font-sans text-[10px] tracking-[0.2em] uppercase outline-none cursor-pointer text-stone-800 border-none focus:ring-0 hover:text-agua transition-colors"
          >
            <option value="recientes">Más recientes</option>
            <option value="precio-menor">Menor a mayor precio</option>
            <option value="precio-mayor">Mayor a menor precio</option>
          </select>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
        {filteredProducts.map((product) => (
          // Usamos product._id que es como lo manda Sanity
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-32 text-center">
          <p className="font-serif italic text-stone-300 text-lg">
            Pronto saldrán nuevas piezas de esta categoría...
          </p>
        </div>
      )}
    </div>
  );
};

export default CatalogClient;
