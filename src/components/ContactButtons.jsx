export default function ContactButtons({ product }) {
  const subject = `Consulta sobre ${product.title} (${product.id})`;

  const body = `Hola, me interesa la pieza "${product.title}" (código ${product.id}). ¿Podrían darme más información?`;

  const emailLink = `mailto:kahluceramica@gmail.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-10">
      {/* EMAIL */}
      <a
        href={emailLink}
        className="bg-agua text-white px-6 py-3 rounded-lg text-sm tracking-wide hover:bg-agua-dark transition"
      >
        Consultar por correo
      </a>

      {/* INSTAGRAM */}
      <a
        href="https://instagram.com/kahluceramica"
        target="_blank"
        className="border border-terracota text-terracota px-6 py-3 rounded-lg text-sm tracking-wide hover:bg-terracota/10 transition"
      >
        Instagram
      </a>
    </div>
  );
}
