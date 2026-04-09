import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

export default function Home() {
  const featured = products.filter((p) => p.featured);
  const latest = products.filter((p) => p.isNew);

  return (
    <main className="px-6 md:px-16 py-16 space-y-20">
      {/* HERO */}
      <section className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-light leading-tight">
          Kahlu Cerámica
        </h1>

        <p className="mt-4 text-gray-500">
          Piezas hechas a mano para el uso diario.
        </p>
      </section>

      {/* DESTACADOS */}
      <section>
        <h2 className="text-sm text-gray-400 mb-6">Destacados</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* NUEVOS */}
      <section>
        <h2 className="text-sm text-gray-400 mb-6">Nuevos</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {latest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <Link href="/catalog" className="text-sm underline">
        Ver todo →
      </Link>
    </main>
  );
}
