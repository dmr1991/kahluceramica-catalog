// src/app/catalog/page.tsx
import Navbar from "@/components/Navbar";
import CatalogClient from "@/components/CatalogClient"; // El que creamos arriba
import { getProducts } from "@/sanity/lib/queries"; // Tu función mágica

export default async function CatalogoPage() {
  // Traemos los datos de Sanity en el servidor (más rápido y mejor SEO)
  const initialProducts = await getProducts();

  return (
    <div className="min-h-screen bg-white text-stone-800">
      <Navbar />
      <CatalogClient initialProducts={initialProducts} />
    </div>
  );
}