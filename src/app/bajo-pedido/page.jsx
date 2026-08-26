// src/app/bajo-pedido/page.jsx
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { getMadeToOrderProducts } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

// Reemplaza con el enlace público de tu Google Form
const GOOGLE_FORM_URL = "https://forms.gle/TU_GOOGLE_FORM_AQUI";

export default async function MadeToOrderPage() {
  const products = await getMadeToOrderProducts();

  return (
    <div className="min-h-screen w-full max-w-[100vw] bg-arena text-carbon flex flex-col justify-between overflow-x-hidden">
      <div className="w-full flex flex-col items-center">
        <Navbar />

        {/* Hero */}
        <section className="w-full pt-28 pb-12 sm:pt-36 md:pt-44 md:pb-16 overflow-hidden">
          <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 text-center">
            {/* Botón de retorno */}
            <div className="flex justify-center mb-6">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-carbon/60 hover:text-carbon transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver al catálogo
              </Link>
            </div>

            <p className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] uppercase text-carbon mb-3 sm:mb-4">
              Producción artesanal por encargo
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase font-serif italic mb-4 sm:mb-6 whitespace-nowrap">
              Bajo Pedido
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-carbon/80 font-light max-w-xl mx-auto leading-relaxed mb-8">
              Piezas fijas con diseños propios de Kahlu Cerámica, modeladas a
              mano especialmente para ti. Abrimos cupos por ciclo de quema para
              trabajar cada pieza con dedicación y apegándose a los tiempos de
              producción de la cerámica.
            </p>

            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-carbon text-arena px-8 py-3.5 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase hover:bg-carbon/90 transition-all rounded-sm shadow-sm"
            >
              Solicitar piezas por encargo
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Tiempos y Proceso */}
        <section className="w-full border-y border-arcilla/10 bg-white/50 py-8 mb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="w-4 h-4 text-arcilla" />
              <p className="text-[10px] tracking-widest uppercase font-medium">
                100% Hecho a Mano
              </p>
              <p className="text-xs text-carbon/70 font-light max-w-xs">
                Piezas realizadas a mano utilizando distintas técnicas de
                modelado. Cada pieza es única.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-4 h-4 text-arcilla" />
              <p className="text-[10px] tracking-widest uppercase font-medium">
                Tiempos del Barro
              </p>
              <p className="text-xs text-carbon/70 font-light max-w-xs">
                Tiempo estimado de 8 a 11 semanas para modelado, secado,
                esmaltado y quemas. Sujeto a ciclos de quema.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-arcilla" />
              <p className="text-[10px] tracking-widest uppercase font-medium">
                Coordinación directa
              </p>
              <p className="text-xs text-carbon/70 font-light max-w-xs">
                Llena el formulario indicando tus piezas de interés y nos
                comunicamos contigo para que coordinemos detalles.
              </p>
            </div>
          </div>
        </section>

        {/* Listado de Estilos */}
        <section className="w-full pb-20 sm:pb-28">
          <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-serif italic mb-2">
                Estilos Disponibles
              </h2>
              <p className="text-xs sm:text-sm text-carbon/70 font-light">
                Diseños disponibles para solicitar en tu orden.
              </p>
            </div>

            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10">
                {products.map((item) => (
                  <article
                    key={item._id}
                    className="bg-white/100 rounded-sm border border-arcilla/10 overflow-hidden flex flex-col justify-between shadow-sm group"
                  >
                    <div>
                      <div className="aspect-square bg-arena/20 overflow-hidden relative p-4 flex items-center justify-center">
                        <img
                          src={
                            item.imageUrl ||
                            "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&fit=crop"
                          }
                          alt={item.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] font-bold uppercase px-2.5 py-1 bg-carbon text-white rounded-xs">
                          Bajo pedido
                        </span>
                      </div>

                      <div className="p-6">
                        {item.code && (
                          <p className="text-[10px] tracking-widest uppercase text-arcilla mb-1 font-mono">
                            Ref: {item.code}
                          </p>
                        )}
                        <h3 className="text-2xl font-serif italic text-carbon mb-2">
                          {item.name}
                        </h3>
                        <p className="text-s text-carbon/100 font-light leading-relaxed mb-4 line-clamp-3">
                          {item.description}
                        </p>

                        {item.details && item.details.length > 0 && (
                          <ul className="border-t border-arcilla/10 pt-3 space-y-1">
                            {item.details.map((det, idx) => (
                              <li
                                key={idx}
                                className="text-[12px] text-carbon/100 font-light flex items-center gap-1.5"
                              >
                                <span className="w-1 h-1 rounded-full bg-arcilla" />
                                {det}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-arcilla/10 mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] tracking-widest uppercase text-carbon/90">
                          Precio base
                        </p>
                        <p className="text-m font-medium text-carbon">
                          Q{item.salePrice || item.price}
                        </p>
                      </div>

                      <a
                        href={GOOGLE_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-carbon hover:text-arcilla transition-colors font-medium"
                      >
                        Solicitar estilo
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/60 rounded-sm border border-arcilla/10 max-w-xl mx-auto px-6">
                <h3 className="text-xl font-serif italic mb-2">
                  Pedidos temporalmente cerrados
                </h3>
                <p className="text-xs text-carbon/70 font-light mb-6 leading-relaxed">
                  Actualmente el cupo de producción está completo. Déjanos tus
                  datos para avisarte en cuanto abramos el próximo ciclo de
                  quema.
                </p>
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-carbon/20 px-6 py-3 text-[9px] tracking-[0.25em] uppercase hover:bg-white/40 transition-all rounded-sm text-carbon"
                >
                  Unirme a la lista de espera
                </a>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-arcilla/40 py-12 sm:py-16 bg-white/100">
        <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <p className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-arcilla text-center md:text-left">
            © 2026 Kahlu Cerámica
          </p>
          <div className="flex items-center gap-8 text-[9px] sm:text-[10px] tracking-widest uppercase text-arcilla">
            <Link href="/" className="hover:text-carbon transition-colors">
              Inicio
            </Link>
            <Link
              href="/catalog"
              className="hover:text-carbon transition-colors"
            >
              Catálogo
            </Link>
            <a
              href="https://instagram.com/kahluceramica"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-carbon transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
