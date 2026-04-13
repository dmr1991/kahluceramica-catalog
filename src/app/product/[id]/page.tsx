// src/app/product/[id]/page.tsx
import { getProductById } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductPage({ params }: { params: { id: string } }) {
  // 1. Vamos a Sanity a buscar la pieza por su ID real
  const product = await getProductById(params.id);

  // 2. Si no existe en la base de datos, mostramos error
  if (!product) {
    notFound();
  }

  // 3. Si existe, le pasamos toda la info a tu diseño (el componente nuevo)
  return <ProductDetailClient product={product} />;
}