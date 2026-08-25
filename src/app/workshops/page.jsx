import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  Check,
  Instagram,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

async function getWorkshopsData() {
  const query = `*[_type == "workshop"] | order(date asc){
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
    <div className="min-h-screen bg-arena text-carbon flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-48 md:pb-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-[10px] tracking-[0.5em] uppercase text-carbon mb-4">
              Aprender y crear con las manos
            </p>
            <h1 className="text-5xl md:text-7xl font-light tracking-[0.6em] uppercase font-serif italic mb-6">
              Workshops
            </h1>
            <p className="text-sm md:text-base text-carbon/80 font-light max-w-xl mx-auto leading-relaxed">
              Espacios íntimos dedicados a pausar, experimentr con la arcilla y explorar
              tu creatividad a través del barro modelado a mano.
            </p>
          </div>
        </section>

        {/* Listado de Talleres */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto px-6">
            {workshops && workshops.length > 0 ? (
              <div className="space-y-16 md:space-y-24">
                {workshops.map((ws) => {
                  const wsImageUrl = ws?.coverImage
                    ? urlFor(ws.coverImage).width(900).height(675).url()
                    : "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&h=675&fit=crop";

                  const formattedDate = formatWorkshopDate(ws.date);

                  return (
                    <article
                      key={ws._id}
                      className="bg-white/20 p-6 md:p-10 rounded-sm border border-arcilla/10 shadow-sm"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Portada */}
                        <div className="lg:col-span-6 aspect-[4/3] bg-white/10 overflow-hidden rounded-sm border border-arcilla/10 relative">
                          <img
                            src={wsImageUrl}
                            alt={ws?.coverImage?.alt || ws.title}
                            className="w-full h-full object-cover opacity-95"
                          />
                          <div className="absolute top-4 left-4">
                            <span
                              className={`text-[9px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-xs ${
                                ws.isActive
                                  ? "bg-carbon text-arena"
                                  : "bg-arcilla text-crema"
                              }`}
                            >
                              {ws.isActive
                                ? "Inscripciones abiertas"
                                : "Cupos llenos"}
                            </span>
                          </div>
                        </div>

                        {/* Detalles */}
                        <div className="lg:col-span-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-4 mb-2">
                              <span className="text-xl md:text-2xl font-serif text-carbon italic">
                                {ws.price}
                              </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-serif font-light tracking-wide mb-4 italic">
                              {ws.title}
                            </h2>

                            <p className="text-xs md:text-sm text-carbon/80 font-light leading-relaxed mb-6 text-justify">
                              {ws.description}
                            </p>

                            {/* Metadatos */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-carbon/80 mb-6 font-light border-y border-arcilla/10 py-4">
                              {formattedDate && (
                                <div className="flex items-center gap-2 sm:col-span-2">
                                  <Calendar className="w-3.5 h-3.5 text-arcilla shrink-0" />
                                  <span className="capitalize">
                                    {formattedDate}
                                  </span>
                                </div>
                              )}
                              {ws.duration && (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-3.5 h-3.5 text-arcilla shrink-0" />
                                  <span>{ws.duration}</span>
                                </div>
                              )}
                              {ws.spots && (
                                <div className="flex items-center gap-2">
                                  <Users className="w-3.5 h-3.5 text-arcilla shrink-0" />
                                  <span>{ws.spots}</span>
                                </div>
                              )}
                              {ws.location && (
                                <div className="flex items-center gap-2 sm:col-span-2">
                                  <MapPin className="w-3.5 h-3.5 text-arcilla shrink-0" />
                                  <span>{ws.location}</span>
                                </div>
                              )}
                            </div>

                            {/* Incluye */}
                            {ws.includes && ws.includes.length > 0 && (
                              <div className="mb-8">
                                <p className="text-[10px] tracking-[0.2em] uppercase text-carbon/90 mb-3 font-medium">
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

                          {/* Botón */}
                          <div>
                            {ws.isActive ? (
                              <a
                                href={`https://wa.me/?text=${encodeURIComponent(
                                  `¡Hola! Me gustaría reservar mi cupo para el taller "${ws.title}" en Kahlu Cerámica.`,
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-carbon text-arena px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase hover:bg-carbon/90 transition-all rounded-sm shadow-sm"
                              >
                                Reservar mi cupo
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            ) : (
                              <a
                                href="https://instagram.com/kahluceramica"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-carbon/20 px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase hover:bg-white/20 transition-all rounded-sm text-carbon/80"
                              >
                                Consultar próximas fechas
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Mini galería de talleres anteriores */}
                      {ws.gallery && ws.gallery.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-arcilla/10">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-carbon/80 mb-4 font-light">
                            Momentos en el taller
                          </p>
                          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                            {ws.gallery.map((galImg, gIdx) => (
                              <div
                                key={gIdx}
                                className="aspect-square w-24 sm:w-28 bg-white/10 overflow-hidden rounded-sm border border-arcilla/10"
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
              <div className="text-center py-20 bg-white/20 rounded-sm border border-arcilla/10">
                <h3 className="text-2xl font-serif italic mb-3">
                  Próximamente nuevas fechas
                </h3>
                <p className="text-xs text-carbon/70 font-light max-w-sm mx-auto mb-6 leading-relaxed">
                  Estamos preparando los próximos talleres. Escríbeme por
                  Instagram para enterarte de las nuevas fechas antes que nadie.
                </p>
                <a
                  href="https://instagram.com/kahluceramica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-carbon/20 px-6 py-3 text-[10px] tracking-[0.25em] uppercase hover:bg-white/20 transition-all rounded-sm"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  Ir a Instagram
                </a>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-arcilla/40 py-16 bg-white/100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-arcilla">
            © 2026 Kahlu Cerámica
          </p>
          <div className="flex items-center gap-8 text-[10px] tracking-widest uppercase text-arcilla">
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
