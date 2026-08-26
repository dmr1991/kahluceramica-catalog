import Link from "next/link";
import { ArrowRight, Instagram } from "lucide-react";
import Navbar from "@/components/Navbar";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
export const dynamic = "force-dynamic";

// Consulta GROQ para obtener la información de Sanity
async function getKahluData() {
  const query = `*[_type == "kahlu"][0]{
    title,
    subtitle,
    bioImage,
    bioHeading,
    bioParagraphs,
    quote,
    processSteps,
    processGallery
  }`;

  return await client.fetch(query, {}, { next: { revalidate: 0 } });
}

const defaultSteps = [
  {
    step: "01",
    title: "Modelado",
    description:
      "Cada pieza comienza con las manos en el barro. Sin moldes, sin prisas. Solo la arcilla y la intuición del momento.",
  },
  {
    step: "02",
    title: "Secado y Esmaltado",
    description:
      "Después del secado lento, aplico esmaltes artesanales que desarrollo en mi taller — tonos de tierra, agua y bosque.",
  },
  {
    step: "03",
    title: "Horneado",
    description:
      "El fuego transforma todo. Cada quema es única e irrepetible, dando a cada pieza su carácter final.",
  },
];

const SobreKahlu = async () => {
  const data = await getKahluData();

  // URL dinámica de Sanity con fallback a la foto de Unsplash
  const imageUrl = data?.bioImage
    ? urlFor(data.bioImage).width(800).height(1067).url()
    : "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&h=1067&fit=crop";

  const steps =
    data?.processSteps && data.processSteps.length > 0
      ? data.processSteps
      : defaultSteps;

  return (
    <div className="min-h-screen bg-arena text-carbon">
      <Navbar />

      {/* Título: K A H L U */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] uppercase text-carbon mb-4">
            La historia detrás de
          </p>
          <h1 className="text-5xl md:text-7xl font-light tracking-[0.6em] uppercase font-serif italic">
            {data?.title || "Kahlu"}
          </h1>
        </div>
      </section>

      {/* Bio: foto + texto */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Contenedor de imagen con el estilo de la galería */}
            <div className="aspect-[3/4] bg-white/20 overflow-hidden rounded-sm border border-arcilla/10 shadow-sm">
              <img
                src={imageUrl}
                alt={
                  data?.bioImage?.alt ||
                  "Artista ceramista trabajando en su taller"
                }
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-carbon mb-3">
                {data?.subtitle || "Ceramista artesanal"}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wide mb-8 italic">
                {data?.bioHeading || "El camino al barro"}
              </h2>
              <div className="space-y-6 text-sm leading-relaxed text-carbon/90 font-light text-justify">
                {data?.bioParagraphs && data.bioParagraphs.length > 0 ? (
                  data.bioParagraphs.map((parrafo, index) => (
                    <p key={index}>{parrafo}</p>
                  ))
                ) : (
                  <>
                    <p>
                      Kahlu nació de la curiosidad por los materiales nobles y
                      la necesidad de crear algo con las manos. Lo que empezó
                      como un experimento en un pequeño taller se convirtió en
                      una forma de vida.
                    </p>
                    <p>
                      Cada pieza es modelada a mano, sin moldes, respetando los
                      tiempos del barro. Trabajo con arcillas locales y esmaltes
                      que desarrollo en mi propio taller, buscando siempre tonos
                      que recuerden a la tierra, al agua y a la naturaleza que
                      nos rodea.
                    </p>
                    <p>
                      Mi proceso es lento e intencional. Creo que la cerámica no
                      se puede apurar — cada grieta, cada textura, cada
                      imperfección es parte de la historia de la pieza. No busco
                      la perfección industrial, sino la belleza de lo hecho a
                      mano.
                    </p>
                    <p>
                      Desde Guatemala, mis piezas viajan a espacios que valoran
                      lo artesanal, lo único y lo que se hace con cuidado.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cita Especial */}
      <section className="py-20 md:py-32 border-y border-arcilla/10 bg-crema/100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl md:text-3xl font-serif font-light italic leading-relaxed text-carbon/90">
            "
            {data?.quote ||
              "La cerámica enseña a ir despacio: dejar que las manos escuchen al barro, que la tierra recuerde su forma, y que cada pieza guarde algo del mundo que la inspiró."}
            "
          </p>
        </div>
      </section>

      {/* Galería del Taller y Proceso (Ubicada antes del proceso) */}
      {data?.processGallery && data.processGallery.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-6">
              {data.processGallery.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] max-w-[320px] bg-white/20 overflow-hidden rounded-sm border border-arcilla/10 shadow-sm"
                >
                  <img
                    src={urlFor(img).width(600).height(600).url()}
                    alt={img.alt || `Foto del taller y proceso ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Proceso */}
      <section className="pb-20 md:pb-28 py-20 md:py-28 bg-crema/100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[10px] tracking-[0.3em] uppercase text-carbon mb-2">
              La evolución del barro hacia piezas únicas.
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wide italic">
              Mi Proceso
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {steps.map((item) => (
              <div key={item.step} className="text-center group">
                <span className="text-5xl font-serif font-light text-carbon/90 block mb-6 transition-colors group-hover:text-arcilla/100">
                  {item.step}
                </span>
                <h3 className="text-xl font-serif font-light mb-4 italic">
                  {item.title}
                </h3>
                <p className="text-xs text-carbon/90 leading-relaxed max-w-xs mx-auto font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Doble: Catálogo + Workshops */}
      <section className="py-20 md:py-32 bg-white/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4 italic">
            ¿Te gustaría comprar una pieza o explotar tu lado creativo en un workshop?
          </h2>
          <p className="text-carbon/80 text-sm mb-10 max-w-md mx-auto font-light leading-relaxed">
            Lleva una pieza única Kahlu a tu espacio o acompáñame en el taller a crear
            la tuya desde cero.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/catalog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-carbon text-arena px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-carbon/80 transition-all rounded-sm shadow-sm"
            >
              Ver catálogo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/workshops"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-terracota text-crema px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-terracota/90 transition-all rounded-sm shadow-sm"
            >
              Próximos Workshops
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://instagram.com/kahluceramica"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-carbon/20 px-8 py-4 text-[10px] tracking-[0.3em] uppercase hover:bg-white/20 transition-all rounded-sm"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="border-t border-stone-100 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-carbon-400">
            © 2026 KAHLU CERÁMICA
          </p>
          <div className="flex items-center gap-6 text-[10px] tracking-widest uppercase text-carbon-400">
            <a
              href="mailto:kahluceramica@gmail.com"
              className="hover:text-stone-400 transition-colors"
            >
              Email
            </a>
            <a
              href="https://instagram.com/kahluceramica"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-400 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SobreKahlu;
