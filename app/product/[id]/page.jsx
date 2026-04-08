import { products } from "../../../data/products";

export default async function ProductPage({ params }) {
  const { id } = await params; // 👈 ESTE ES EL FIX

  const product = products.find(
    p => p.id.toLowerCase() === id.toLowerCase()
  );

  if (!product) {
    return (
      <div className="p-10">
        <p>Producto no encontrado</p>
        <p>ID recibido: {id}</p>
      </div>
    );
  }

  const subject = `Consulta sobre ${product.title} (${product.id})`;
  const body = `Hola! Me interesa esta pieza:\n\n${product.title}\nCódigo: ${product.id}`;

  const emailLink = `mailto:kahluceramica@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <main className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[400px] object-cover rounded-2xl"
        />

        <div>
          <h1 className="text-3xl mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4">Código: {product.id}</p>

          {product.onSale ? (
            <div>
              <p className="line-through text-gray-400">
                Q{product.price}
              </p>
              <p className="text-2xl">Q{product.salePrice}</p>
            </div>
          ) : (
            <p className="text-2xl">Q{product.price}</p>
          )}

          {product.pricePair && (
            <p className="mt-2 text-gray-600">
              Par: Q{product.pricePair}
            </p>
          )}

          <p className="mt-6">{product.description}</p>

          <div className="flex gap-4 mt-6">
            <a
              href={emailLink}
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Consultar por correo
            </a>

            <a
              href="https://instagram.com/kahluceramica"
              target="_blank"
              className="border px-6 py-3 rounded-xl"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}