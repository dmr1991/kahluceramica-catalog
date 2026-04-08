import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function CatalogPage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl mb-6">Catálogo</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}