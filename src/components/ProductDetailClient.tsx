"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Send, Copy, Check } from "lucide-react";
import Navbar from "@/components/Navbar";

// Tu icono de Instagram
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const ProductDetailClient = ({ product }: { product: any }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const emailAddress = "kahluceramica@gmail.com";

  // Usamos el array de imágenes de Sanity o la imagen principal si no hay más
  const images = product.allImages || [product.imageUrl];

  // ✅ LÓGICA PARA EL CORREO (Ahora con datos de Sanity)
  const subject = encodeURIComponent(`Consulta: ${product.name}`);
  const body = encodeURIComponent(
    `Hola KAHLU CERÁMICA,\n\nMe gustaría consultar sobre la pieza "${product.name}".\n\n¡Gracias!`,
  );
  const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData(e.target);
    try {
      const response = await fetch("https://formspree.io/f/xreongve", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setIsSuccess(true);
        e.target.reset();
      }
    } catch (error) {
      alert("Error de conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-arena text-stone-800">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase mb-12 hover:opacity-60 transition-opacity "
        >
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Galería */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-stone-50 overflow-hidden relative ">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-stone-50 overflow-hidden border ${currentImageIndex === index ? "border-agua opacity-100" : "border-arenaopacity-80"}`}
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

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-carbon mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-light text-stone-800 mb-6 tracking-tight">
              {product.name}
            </h1>

            <div className="mb-8">
              {product.onSale ? (
                <div className="flex items-center gap-3">
                  <p className="text-2xl text-rose-700 font-medium">
                    Q{product.salePrice}
                  </p>
                  <p className="text-lg text-stone-300 line-through">
                    Q{product.price}
                  </p>
                </div>
              ) : (
                <p className="text-2xl text-carbon font-medium">
                  Q{product.price}
                </p>
              )}
            </div>

            <div className="prose prose-sm text-carbon font-light leading-relaxed mb-12 italic">
              <p>
                {product.description ||
                  "Pieza única modelada a mano con procesos artesanales."}
              </p>
            </div>

            {/* Acciones */}
            <div className="space-y-6">
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setIsSuccess(false);
                }}
                className="w-full bg-agua text-white py-4 text-xs tracking-[0.3em] uppercase hover:bg-agua-dark transition-all duration-500 ease-in-out"
              >
                {showForm
                  ? "Cerrar Formulario"
                  : product.isMadeToOrder
                    ? "Encargar Pieza"
                    : "Consultar Disponibilidad"}
              </button>

              <div className="flex flex-col items-center gap-4 pt-6">
                <div className="flex items-center gap-8 text-carbon">
                  <a
                    href={mailtoLink}
                    className="hover:opacity-40 transition-opacity"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com/kahluceramica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-40 transition-all duration-500 ease-in-out"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="text-[10px] tracking-widest uppercase cursor-pointer text-carbon hover:opacity-40 transition-all duration-500 ease-in-out"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p
                  onClick={copyToClipboard}
                  className="text-[10px] tracking-widest uppercase cursor-pointer hover:opacity-40 transition-all duration-500 ease-in-out"
                >
                  {copied ? "¡Correo copiado!" : emailAddress}
                </p>
              </div>

              {showForm && (
                <div className="mt-8 p-6 border border-stone-100 bg-crema animate-in fade-in slide-in-from-top-4">
                  {isSuccess ? (
                    <div className="text-center py-4 space-y-1">
                      <p className="text-xs tracking-widest uppercase text-stone-800">
                        ¡Mensaje enviado!
                      </p>
                      <p className="text-[10px] tracking-widest uppercase text-carbon">
                        Te responderé pronto.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="hidden" name="Pieza" value={product.name} />
                      <input
                        type="text"
                        name="nombre"
                        placeholder="NOMBRE"
                        required
                        className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:border-stone-800 outline-none transition-colors placeholder:text-[10px] placeholder:text-carbon/70"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="EMAIL"
                        required
                        className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:border-stone-800 outline-none transition-colors placeholder:text-[10px] placeholder:text-carbon/70"
                      />
                      <textarea
                        name="mensaje"
                        placeholder="TU MENSAJE..."
                        rows={3}
                        className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:border-stone-800 outline-none transition-colors resize-none placeholder:text-[10px] placeholder:text-carbon/70"
                      ></textarea>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 border border-stone-400 text-carbon py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-arena hover:text-carbon transition-all duration-500 ease-in-out disabled:opacity-50"
                      >
                        {isSubmitting ? "Enviando..." : "Enviar"}{" "}
                        <Send className="w-3 h-3" />
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailClient;
