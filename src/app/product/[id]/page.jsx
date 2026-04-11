"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Send, Copy, Check } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { products } from "@/data/products";

const InstagramIcon = ({ className }) => (
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

const ProductDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const product = products.find((p) => String(p.id) === id);
  const emailAddress = "kahluceramica@gmail.com";

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-serif italic">Pieza no encontrada...</p>
      </div>
    );
  }

  // ✅ LÓGICA PARA EL CORREO AUTOGENERADO
  const subject = encodeURIComponent(
    `Consulta: ${product.name} (Ref: ${product.code})`,
  );
  const body = encodeURIComponent(
    `Hola KAHLU CERÁMICA,\n\nMe gustaría consultar la disponibilidad de la pieza "${product.name}" con código de producto ${product.code}.\n\n¡Gracias!`,
  );
  const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xreongve", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setIsSuccess(true);
        form.reset();
      } else {
        alert("Ocurrió un error. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      alert("Error de conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-carbon">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-12 hover:opacity-60 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-crema overflow-hidden relative">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square bg-crema overflow-hidden border ${
                      currentImageIndex === index
                        ? "border-carbon"
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

          <div className="flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-carbon-light/60 mb-2">
              {product.code}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-light text-carbon mb-6 tracking-tight">
              {product.name}
            </h1>
            <p className="text-xl text-carbon mb-8">${product.price} USD</p>

            <div className="prose prose-sm text-carbon-light font-light leading-relaxed mb-12">
              <p>
                {product.description ||
                  "Una pieza única hecha a mano con arcilla de alta temperatura, terminada con esmaltes orgánicos que resaltan la belleza de lo imperfecto."}
              </p>
            </div>

            <div className="space-y-6">
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setIsSuccess(false);
                }}
                className="w-full bg-carbon text-white py-4 text-xs tracking-[0.3em] uppercase hover:bg-carbon/90 transition-colors"
              >
                {showForm ? "Cerrar Formulario" : "Consultar disponibilidad"}
              </button>

              <div className="flex flex-col items-center gap-4 pt-6">
                <div className="flex items-center gap-8">
                  {/* ✅ Enlace de Correo con los datos autocompletados */}
                  <a
                    href={mailtoLink}
                    className="hover:opacity-50 transition-opacity"
                    title="Enviar correo"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com/kahluceramica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-50 transition-opacity"
                    title="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 hover:opacity-50 transition-opacity"
                    title="Copiar email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p
                  onClick={copyToClipboard}
                  className="font-sans text-[10px] tracking-widest uppercase cursor-pointer hover:text-carbon-light transition-colors"
                >
                  {copied ? "¡Correo copiado!" : emailAddress}
                </p>
              </div>

              {showForm && (
                <div className="mt-8 p-6 md:p-8 border border-carbon/10 bg-crema/20 transition-all animate-in fade-in slide-in-from-top-4">
                  {isSuccess ? (
                    <div className="text-center py-4 space-y-1">
                      <p className="font-sans text-xs tracking-widest uppercase text-carbon">
                        ¡Mensaje enviado!
                      </p>
                      <p className="font-sans text-[10px] tracking-widest uppercase text-carbon-light/60">
                        Te responderé pronto.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <h3 className="font-sans text-xs tracking-widest uppercase mb-4 text-center text-carbon">
                        Enviar mensaje directo por correo.
                      </h3>
                      <input type="hidden" name="Pieza" value={product.name} />
                      <input
                        type="hidden"
                        name="Referencia"
                        value={product.code}
                      />
                      <input
                        type="text"
                        name="nombre"
                        placeholder="NOMBRE"
                        required
                        className="w-full bg-transparent border-b border-carbon/20 py-2 font-sans text-sm tracking-wide focus:border-carbon outline-none transition-colors placeholder:text-[10px] placeholder:tracking-widest"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="EMAIL"
                        required
                        className="w-full bg-transparent border-b border-carbon/20 py-2 font-sans text-sm tracking-wide focus:border-carbon outline-none transition-colors placeholder:text-[10px] placeholder:tracking-widest"
                      />
                      <textarea
                        name="mensaje"
                        placeholder="TU MENSAJE..."
                        rows={3}
                        className="w-full bg-transparent border-b border-carbon/20 py-2 font-sans text-sm tracking-wide focus:border-carbon outline-none transition-colors resize-none placeholder:text-[10px] placeholder:tracking-widest"
                      ></textarea>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 bg-transparent border border-carbon text-carbon py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-carbon hover:text-white transition-all disabled:opacity-50"
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

export default ProductDetail;
