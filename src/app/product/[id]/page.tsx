// src/app/product/[id]/page.tsx
import { getProductById } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
export const dynamic = "force-dynamic";
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(id);

  // Si el producto no existe o está marcado como no disponible, retorna 404
  if (!product || product.isAvailable === false) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}