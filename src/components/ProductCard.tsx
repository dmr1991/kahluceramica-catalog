"use client";

import Link from "next/link";

// Aceptamos el objeto 'product' que viene de Sanity
const ProductCard = ({ product }: { product: any }) => {
  return (
    <Link href={`/product/${product._id}`} className="group block">
      <div className="aspect-[3/4] overflow-hidden rounded-sm bg-stone-100 mb-4 relative">
        <img
          src={product.imageUrl} // Usamos la URL que extrajimos en la query
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge para piezas bajo pedido (como las Aurora Tumblers) */}
        {product.isMadeToOrder && (
          <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[9px] tracking-widest uppercase px-2 py-1 text-stone-600 border border-stone-200">
            Bajo pedido
          </span>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400">
            {product.category}
          </p>
          {product.code && (
            <p className="text-[10px] text-stone-300">{product.code}</p>
          )}
        </div>

        <h3
          className="text-lg font-light text-stone-800"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {product.name}
        </h3>

        {/* Lógica de precios en Quetzales */}
        <div className="flex items-center gap-2">
          {product.onSale ? (
            <>
              <p className="text-sm font-medium text-rose-700">
                Q{product.salePrice}
              </p>
              <p className="text-xs text-stone-400 line-through font-light">
                Q{product.price}
              </p>
            </>
          ) : (
            <p className="text-sm text-stone-600 font-medium">
              Q{product.price}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
