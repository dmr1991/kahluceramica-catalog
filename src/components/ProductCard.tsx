"use client";

import Link from "next/link"; 
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/product/${product.id}`} className="group block"> 
      {/* 👆 Cambié "to" por "href" y la ruta a "/product/" para que coincida con tu carpeta */}
      <div className="aspect-[3/4] overflow-hidden rounded-sm bg-muted mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-1">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">{product.code}</p>
        <h3 className="text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground">${product.price} USD</p>
      </div>
    </Link>
  );
};

export default ProductCard;