// src/app/catalog/page.tsx
import Navbar from "@/components/Navbar";
import CatalogClient from "@/components/CatalogClient";
import { getProducts } from "@/sanity/lib/queries";

export default async function CatalogoPage() {
  // Traemos los datos de Sanity en el servidor para que cargue rápido
  const initialProducts = await getProducts();

  return (
    /* Cambiamos bg-white por bg-arena (#EDE0D4) 
       y text-stone-800 por text-carbon (#3D3428)
    */
    <main className="min-h-screen bg-arena text-carbon">
      <Navbar />
      
      {/* El componente CatalogClient maneja los filtros y el grid.
         Asegúrate de que dentro de CatalogClient no haya divs con "bg-white" 
         que puedan estar tapando este fondo arena.
      */}
      <CatalogClient initialProducts={initialProducts} />
    </main>
  );
}