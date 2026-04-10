"use client";

import { useState } from "react";
// Importante: Si lo pusiste en layout.tsx, puedes quitar el <Navbar /> de aquí abajo.
// Pero lo dejamos aquí para asegurar que Vercel encuentre la ruta.
import Navbar from "@/components/Navbar";
import { products } from "@/data/products";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Estilo Artesanal */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/5 z-10" />
          {/* Aquí puedes poner una imagen de tus cerámicas después */}
          <div className="w-full h-full bg-arena/30 flex items-center justify-center text-arcilla/20">
            <span className="font-serif text-[15vw] uppercase tracking-tighter opacity-10">
              Kahlu
            </span>
          </div>
        </div>

        <div className="relative z-20 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 tracking-tight text-carbon">
            KAHLU <span className="italic">Cerámica</span>
          </h1>
          <p className="text-lg md:text-xl font-light tracking-widest uppercase text-carbon-light mb-8 max-w-xl mx-auto">
            Objetos atemporales hechos a mano para el hogar.
          </p>
          <Link
            href="/catalog"
            className="inline-block border border-carbon px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-carbon hover:text-white transition-all duration-500"
          >
            Explorar Catálogo
          </Link>
        </div>
      </section>

      {/* Grid de Productos Destacados */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-serif italic text-carbon">
            Colección Reciente
          </h2>
          <Link
            href="/catalog"
            className="text-xs tracking-widest uppercase border-b border-carbon pb-1"
          >
            Ver todo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden bg-crema mb-4 relative">
                {/* Placeholder de imagen */}
                <div className="w-full h-full bg-arena/20 group-hover:scale-105 transition-transform duration-700 ease-out" />
                {product.isNew && (
                  <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase bg-white px-2 py-1">
                    Nuevo
                  </span>
                )}
              </div>
              <h3 className="font-serif text-xl text-carbon mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-carbon-light font-light tracking-wide">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="border-t border-border/50 py-12 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-carbon-light">
          © 2026 KAHLU CERÁMICA — Hecho con intención.
        </p>
      </footer>
    </div>
  );
}
