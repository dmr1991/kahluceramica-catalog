import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[300px] object-cover rounded-xl transition duration-300 group-hover:opacity-90"
        />

        <div className="mt-3 space-y-1">
          <h3 className="text-base">{product.title}</h3>

          <p className="text-xs text-gray-400">{product.id}</p>

          {product.onSale ? (
            <div className="flex gap-2 text-sm">
              <span className="line-through text-gray-400">
                Q{product.price}
              </span>
              <span>Q{product.salePrice}</span>
            </div>
          ) : (
            <p className="text-sm">Q{product.price}</p>
          )}

          {product.pricePair && (
            <p className="text-xs text-gray-500">Par: Q{product.pricePair}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
