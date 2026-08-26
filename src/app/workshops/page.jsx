import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  Check,
  Tag,
  Instagram,
  Facebook,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
export const dynamic = "force-dynamic";

// Número de WhatsApp configurado
const WHATSAPP_PHONE_NUMBER = "50245200989";

async function getWorkshopsData() {
  // Solo consulta los talleres que tienen el switch "isActive" encendido
  const query = `*[_type == "workshop" && isActive == true] | order(date asc){
    _id,
    title,
    slug,
    coverImage,
    date,
    duration,
    location,
    price,
    spots,
    includes,
    description,
    gallery,
    isActive
  }`;

  return await client.fetch(query, {}, { next: { revalidate: 0 } });
}

function formatWorkshopDate(dateString) {
  if (!dateString) return null;
  const d = new Date(dateString);
  return d.toLocaleDateString("es-GT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const WorkshopsPage = async () => {
  const workshops = await getWorkshopsData();

  return (
    <div className="min-h-screen w-full max-w-[100vw] bg-arena text-carbon flex flex-col justify-between overflow-x-hidden">
      <div className="w-full flex flex-col items-center">
        <Navbar />

        {/* Hero */}
        <section className="w-full pt-28 pb-12 sm:pt-36 md:pt-48 md:pb-20 overflow-hidden">
          <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 text-center">
            <p className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] uppercase text-carbon mb-3 sm:mb-4">
              Aprender y crear con las manos
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.3em] uppercase font-serif italic mb-4 sm:mb-6 whitespace-nowrap">
              Workshops
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-carbon/80 font-light max-w-xl mx-auto leading-relaxed">
              Espacios íntimos dedicados a pausar, experimentar con la arcilla y
              explorar tu creatividad a través del barro modelado a mano.
            </p>
          </div>
        </section>

        {/* Listado de Talleres */}
        <section className="w-full pb-20 sm:pb-24 md:pb-32">
          <div className="max-w-5xl w-full mx-auto px-4 sm:px-6">
            {workshops && workshops.length > 0 ? (
              <div className="space-y-12 sm:space-y-16 md:space-y-24 w-full">
                {workshops.map((ws) => {
                  const wsImageUrl = ws?.coverImage
                    ? urlFor(ws.coverImage).auto("format").fit("max").url()
                    : "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&fit=crop";

                  const formattedDate = formatWorkshopDate(ws.date);

                  return (
                    <article
                      key={ws._id}
                      className="w-full bg-white/100 p-5 sm:p-8 md:p-10 rounded-sm border border-arcilla/10 shadow-sm mx-auto"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
                        {/* Portada */}
                        <div className="lg:col-span-6 w-full flex items-center justify-center bg-arena/20 rounded-sm border border-arcilla/10 relative p-2 md:p-4">
                          <img
                            src={wsImageUrl}
                            alt={ws?.coverImage?.alt || ws.title}
                            className="w-full h-auto max-h-[350px] sm:max-h-[450px] object-contain rounded-xs"
                          />
                          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                            <span className="text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xs shadow-xs bg-carbon text-arena">
                              Inscripciones abiertas
                            </span>
                          </div>
                        </div>

                        {/* Detalles */}
                        <div className="lg:col-span-6 flex flex-col justify-between w-full">
                          <div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-light tracking-wide mb-3 sm:mb-4 italic">
                              {ws.title}
                            </h2>

                            <p className="text-xs sm:text-sm text-carbon/80 font-light whitespace-pre-line leading-relaxed mb-6 text-left">
                              {ws.description}
                            </p>

                            {/* Bullets informativos */}
                            <div className="mb-6 border-y border-arcilla/10 py-4 sm:py-5">
                              <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-carbon/90 mb-3 font-medium">
                                Detalles del taller:
                              </p>
                              <ul className="space-y-2 sm:space-y-2.5">
                                {formattedDate && (
                                  <li className="flex items-start gap-2.5 text-xs text-carbon/85 font-light">
                                    <Calendar className="w-3.5 h-3.5 text-arcilla shrink-0 mt-0.5" />
                                    <span>
                                      <strong className="font-bold text-carbon">
                                        Fecha:
                                      </strong>{" "}
                                      <span className="capitalize">
                                        {formattedDate}
                                      </span>
                                    </span>
                                  </li>
                                )}
                                {ws.duration && (
                                  <li className="flex items-start gap-2.5 text-xs text-carbon/85 font-light">
                                    <Clock className="w-3.5 h-3.5 text-arcilla shrink-0 mt-0.5" />
                                    <span>
                                      <strong className="font-bold text-carbon">
                                        Duración:
                                      </strong>{" "}
                                      {ws.duration}
                                    </span>
                                  </li>
                                )}
                                {ws.location && (
                                  <li className="flex items-start gap-2.5 text-xs text-carbon/85 font-light">
                                    <MapPin className="w-3.5 h-3.5 text-arcilla shrink-0 mt-0.5" />
                                    <span>
                                      <strong className="font-bold text-carbon">
                                        Lugar:
                                      </strong>{" "}
                                      {ws.location}
                                    </span>
                                  </li>
                                )}
                                <li className="flex items-start gap-2.5 text-xs text-carbon/85 font-light">
                                  <Users className="w-3.5 h-3.5 text-arcilla shrink-0 mt-0.5" />
                                  <span>
                                    <strong className="font-bold text-carbon">
                                      Cupo:
                                    </strong>{" "}
                                    Espacios disponibles
                                  </span>
                                </li>
                                {ws.price && (
                                  <li className="flex items-start gap-2.5 text-xs text-carbon/85 font-light">
                                    <Tag className="w-3.5 h-3.5 text-arcilla shrink-0 mt-0.5" />
                                    <span>
                                      <strong className="font-bold text-carbon">
                                        Inscripción:
                                      </strong>{" "}
                                      {ws.price}
                                    </span>
                                  </li>
                                )}
                              </ul>
                            </div>

                            {/* Incluye */}
                            {ws.includes && ws.includes.length > 0 && (
                              <div className="mb-6 sm:mb-8">
                                <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-carbon/90 mb-3 font-medium">
                                  El taller incluye:
                                </p>
                                <ul className="space-y-2">
                                  {ws.includes.map((item, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2 text-xs text-carbon/75 font-light"
                                    >
                                      <Check className="w-3.5 h-3.5 text-arcilla shrink-0 mt-0.5" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Botón de Reserva */}
                          <div className="w-full">
                            <a
                              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
                                `¡Hola! Me gustaría reservar mi cupo para el taller "${ws.title}" en Kahlu Cerámica.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-carbon text-arena px-6 sm:px-8 py-3.5 text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] uppercase hover:bg-carbon/90 transition-all rounded-sm shadow-sm"
                            >
                              Reservar mi cupo
                              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Mini galería */}
                      {ws.gallery && ws.gallery.length > 0 && (
                        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-arcilla/10 w-full">
                          <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-carbon/80 mb-3 sm:mb-4 font-light">
                            Momentos en el taller
                          </p>
                          <div className="flex flex-wrap justify-start gap-2.5 sm:gap-3">
                            {ws.gallery.map((galImg, gIdx) => (
                              <div
                                key={gIdx}
                                className="aspect-square w-20 sm:w-28 bg-white/40 overflow-hidden rounded-sm border border-arcilla/10"
                              >
                                <img
                                  src={urlFor(galImg)
                                    .width(300)
                                    .height(300)
                                    .url()}
                                  alt={
                                    galImg.alt ||
                                    `Taller Kahlu foto ${gIdx + 1}`
                                  }
                                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Vista cuando no hay ningún workshop activo */
              <div className="text-center py-16 sm:py-20 bg-white/100 rounded-sm border border-arcilla/10 max-w-xl mx-auto px-6 shadow-sm">
                <h3 className="text-2xl sm:text-3xl font-serif italic mb-3">
                  Próximamente nuevas fechas
                </h3>
                <p className="text-xs sm:text-sm text-carbon/70 font-light max-w-sm mx-auto mb-8 leading-relaxed">
                  Actualmente no tenemos inscripciones abiertas para talleres. Estamos preparando talleres para que puedas experimentar con la cerámica y explotar tu creatividad. Mantente al tanto de nuestras redes sociales para conocer las próximas fechas.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="https://instagram.com/kahluceramica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-carbon text-arena px-6 py-3.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase hover:bg-carbon/90 transition-all rounded-sm shadow-xs"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com/kahluceramica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-carbon/20 px-6 py-3.5 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase hover:bg-white/40 transition-all rounded-sm text-carbon"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    Facebook
                  </a>
                </div>
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
            <a
              href="mailto:kahluceramica@gmail.com"
              className="hover:text-carbon transition-colors"
            >
              Email
            </a>
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
};

export default WorkshopsPage;