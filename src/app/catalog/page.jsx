"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Catalogo = () => {
  // --- ESTADOS ---
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("recientes");

  // --- OBTENER CATEGORÍAS (Dinámicas desde tus datos) ---
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category).filter(Boolean);
    return ["Todas", ...Array.from(new Set(cats))];
  }, []);

  // --- LÓGICA DE FILTRADO Y ORDENADO ---
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Filtrar por categoría
    if (selectedCategory !== "Todas") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Aplicar orden
    if (sortOrder === "precio-menor") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "precio-mayor") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "recientes") {
      // Prioriza los que tengan isNew: true
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    // Si fuera "todas" en el orden, simplemente dejamos el array como viene (o por ID)

    return result;
  }, [selectedCategory, sortOrder]);

  return (
    <div className="min-h-screen bg-background text-carbon">
      <Navbar />
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        
        {/* Encabezado original */}
        <div className="mb-12">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-carbon/40 mb-2">Catálogo</p>
          <h1
            className="text-4xl md:text-5xl font-light tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Todas las piezas
          </h1>
        </div>

        {/* --- BARRA DE FILTROS INTEGRADA --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 border-b border-carbon/5 pb-8">
          
          {/* Categorías (Links de texto) */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-sans text-[10px] tracking-[0.2em] uppercase transition-all ${
                  selectedCategory === cat 
                    ? "text-carbon border-b border-carbon pb-1" 
                    : "text-carbon/30 hover:text-carbon"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Selector de Orden y Reset */}
          <div className="flex items-center gap-4">
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-carbon/30">Organizar:</span>
            <select 
              value={sortOrder}
              onChange={(e) => {
                if (e.target.value === "reset") {
                  setSelectedCategory("Todas");
                  setSortOrder("recientes");
                } else {
                  setSortOrder(e.target.value);
                }
              }}
              className="bg-transparent font-sans text-[10px] tracking-[0.2em] uppercase outline-none cursor-pointer text-carbon border-none focus:ring-0"
            >
              <option value="recientes">Más recientes</option>
              <option value="precio-menor">Menor a mayor precio</option>
              <option value="precio-mayor">Mayor a menor precio</option>
              <option value="reset">Ver todas</option>
            </select>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mensaje de no resultados */}
        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <p className="font-serif italic text-carbon/30 text-lg">
              Pronto saldrán nuevas piezas de esta categoría...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogo;