"use client"; // ✅ ESTO ARREGLA LOS ERRORES 1 Y 2

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, ChevronLeft, ChevronRight } from "lucide-react"; // ✅ QUITAMOS INSTAGRAM DE AQUÍ
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { products } from "@/data/products";

const InstagramIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const ProductDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Buscamos el producto por ID
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-serif italic">Pieza no encontrada...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-12 hover:opacity-60 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Galería de Imágenes */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-crema overflow-hidden relative">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-crema overflow-hidden border ${
                      currentImageIndex === index
                        ? "border-carbon"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del Producto */}
          <div className="flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-carbon-light/60 mb-2">
              {product.code}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-light text-carbon mb-6 tracking-tight">
              {product.name}
            </h1>
            <p className="text-xl text-carbon mb-8">${product.price} USD</p>

            <div className="prose prose-sm text-carbon-light font-light leading-relaxed mb-12">
              <p>
                {product.description ||
                  "Una pieza única hecha a mano con arcilla de alta temperatura, terminada con esmaltes orgánicos que resaltan la belleza de lo imperfecto."}
              </p>
            </div>

            <div className="space-y-6">
              <button className="w-full bg-carbon text-white py-4 text-xs tracking-[0.3em] uppercase hover:bg-carbon/90 transition-colors">
                Consultar disponibilidad
              </button>

              <div className="flex items-center justify-center gap-8 pt-6">
                <a
                  href="mailto:hola@kahluceramica.com"
                  className="hover:opacity-50 transition-opacity"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/kahluceramica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-50 transition-opacity"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
