import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Instagram,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { products } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Producto no encontrado</p>
      </div>
    );
  }

  const emailSubject = encodeURIComponent(
    `Consulta: ${product.name} (${product.code})`,
  );
  const emailBody = encodeURIComponent(
    `Hola Kahlu,\n\nMe interesa la pieza:\n\nNombre: ${product.name}\nCódigo: ${product.code}\nPrecio: $${product.price} USD\n\n¿Podrían darme más información?\n\nGracias`,
  );

  const prevImage = () =>
    setCurrentImage((i) => (i === 0 ? product.images.length - 1 : i - 1));
  const nextImage = () =>
    setCurrentImage((i) => (i === product.images.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image carousel — takes ~55% on large screens */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
              <img
                src={product.images[currentImage]}
                alt={`${product.name} - imagen ${currentImage + 1}`}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center hover:bg-background/90 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center hover:bg-background/90 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentImage ? "bg-background" : "bg-background/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-16 h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                      i === currentImage
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-1">
              {product.collection}
            </p>
            <p className="text-xs tracking-widest text-muted-foreground mb-4">
              {product.code}
            </p>
            <h1
              className="text-3xl md:text-4xl font-light mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {product.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              ${product.price} USD
            </p>

            <p className="text-sm leading-relaxed text-muted-foreground mb-8">
              {product.description}
            </p>

            <div className="mb-10">
              <p className="text-xs tracking-[0.2em] uppercase mb-3">
                Detalles
              </p>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary mt-2 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact CTAs */}
            <div className="space-y-3">
              <a
                href={`mailto:hola@kahluceramica.com?subject=${emailSubject}&body=${emailBody}`}
                className="flex items-center justify-center gap-3 bg-primary text-primary-foreground px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors rounded-sm w-full"
              >
                <Mail className="w-4 h-4" />
                Consultar por email
              </a>
              <a
                href="https://instagram.com/kahluceramica"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border border-border px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-muted transition-colors rounded-sm w-full"
              >
                <Instagram className="w-4 h-4" />
                Escribir por Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
