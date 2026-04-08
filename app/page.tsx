import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

export default function Home() {
  const featured = products.filter((p) => p.featured);
  const latest = products.filter((p) => p.isNew);

  return (
    <main className="px-6 md:px-16 py-12 space-y-20">
      {/* HERO */}
      <section className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl leading-tight">Kahlu Cerámica</h1>
        <p className="mt-4 text-gray-600">
          Piezas hechas a mano, pensadas para el uso diario.
        </p>
      </section>

      {/* DESTACADOS */}
      <section>
        <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-6">
          Colección destacada
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* NUEVOS */}
      <section>
        <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-6">
          Nuevas piezas
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {latest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <div>
        <Link href="/catalog" className="text-sm underline">
          Ver catálogo completo →
        </Link>
      </div>
    </main>
  );
}
