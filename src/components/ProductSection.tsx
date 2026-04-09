"use client";

import Link from "next/link"; // ✅ Corregido
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface Props {
  title: string;
  subtitle?: string;
  products: Product[];
  linkTo: string;
  linkLabel?: string;
}

const ProductSection = ({
  title,
  subtitle,
  products,
  linkTo,
  linkLabel = "Ver más",
}: Props) => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            {subtitle && (
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
                {subtitle}
              </p>
            )}
            <h2
              className="text-3xl md:text-4xl font-light tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {title}
            </h2>
          </div>
          <Link
            href={linkTo} // ✅ Corregido (to -> href)
            className="hidden md:flex items-center gap-2 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors group"
          >
            {linkLabel}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link
          href={linkTo} // ✅ Corregido (to -> href)
          className="md:hidden flex items-center justify-center gap-2 mt-10 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          {linkLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default ProductSection;
