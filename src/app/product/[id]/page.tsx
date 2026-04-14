// src/app/product/[id]/page.tsx
import { getProductById } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

// 1. Agregamos "Promise" al tipo de params
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 2. ¡EL TRUCO MÁGICO! Hay que poner el await aquí:
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
