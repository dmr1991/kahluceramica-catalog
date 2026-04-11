// 1. DEFINIMOS LA "VERDAD ÚNICA" DE LAS CATEGORÍAS
// Si quieres cambiar un nombre, lo haces aquí y se actualiza en todo el sitio.
export const PRODUCT_CATEGORIES = {
  TAZAS: "Tazas",
  DECORACION: "Decoración",
  SETS: "Sets",
  PLATOS: "Platos",
} as const;

// Esto crea un tipo para que TypeScript solo acepte estas categorías
export type Category = typeof PRODUCT_CATEGORIES[keyof typeof PRODUCT_CATEGORIES];

export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  category: Category; // ✅ Ahora usa el tipo restringido
  date: string;       // ✅ Stamp para "Más recientes"
  collection: string;
  description: string;
  details: string[];
  images: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "KHL-0001",
    code: "KHL-0001",
    name: "Vasija Luna Creciente",
    price: 185,
    category: PRODUCT_CATEGORIES.DECORACION, // ✅ Uso de constante
    date: "2026-03-15",
    collection: "Colección Tierra",
    description: "Vasija artesanal torneada a mano con esmalte mineral en tonos arena. Cada pieza es única.",
    details: ["Cerámica de alta temperatura", "Esmalte mineral natural", "Altura: 28cm", "Diámetro: 15cm"],
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=1000&fit=crop",
    ],
    isFeatured: true,
  },
  {
    id: "KHL-0002",
    code: "KHL-0002",
    name: "Plato Onda Marina",
    price: 95,
    category: PRODUCT_CATEGORIES.TAZAS,
    date: "2026-03-10",
    collection: "Colección Tierra",
    description: "Plato decorativo con textura ondulada inspirada en las corrientes marinas.",
    details: ["Cerámica gres", "Esmalte reactivo", "Diámetro: 30cm", "Apto para alimentos"],
    images: [
      "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&h=1000&fit=crop",
    ],
    isFeatured: true,
  },
  {
    id: "KHL-0003",
    code: "KHL-0003",
    name: "Taza Amanecer",
    price: 48,
    category: PRODUCT_CATEGORIES.TAZAS,
    date: "2026-03-05",
    collection: "Colección Tierra",
    description: "Taza con asa orgánica y esmalte degradado en tonos cálidos de terracota.",
    details: ["Cerámica gres", "Capacidad: 350ml", "Apta para microondas", "Lavado a mano recomendado"],
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=800&h=1000&fit=crop",
    ],
    isFeatured: true,
  },
  {
    id: "KHL-0010",
    code: "KHL-0010",
    name: "Jarrón Duna",
    price: 220,
    category: PRODUCT_CATEGORIES.DECORACION,
    date: "2026-04-09",
    collection: "Nuevas Piezas",
    description: "Jarrón escultórico con formas fluidas que evocan dunas del desierto.",
    details: ["Cerámica de alta temperatura", "Acabado mate", "Altura: 35cm", "Pieza decorativa"],
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1581783898382-80983a5004f1?w=800&h=1000&fit=crop",
    ],
    isNew: true,
  },
  {
    id: "KHL-0011",
    code: "KHL-0011",
    name: "Bowl Raíz",
    price: 72,
    category: PRODUCT_CATEGORIES.TAZAS,
    date: "2026-04-05",
    collection: "Nuevas Piezas",
    description: "Bowl orgánico con textura rústica inspirada en raíces de árboles ancestrales.",
    details: ["Cerámica gres", "Esmalte natural", "Diámetro: 22cm", "Apto para alimentos"],
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&h=1000&fit=crop",
    ],
    isNew: true,
  },
  {
    id: "KHL-0012",
    code: "KHL-0012",
    name: "Set Ritual del Té",
    price: 165,
    category: PRODUCT_CATEGORIES.SETS,
    date: "2026-04-01",
    collection: "Nuevas Piezas",
    description: "Set de tetera y dos tazas con acabado wabi-sabi. Para momentos de calma.",
    details: ["Cerámica gres", "Incluye tetera y 2 tazas", "Esmalte ceniza", "Hecho a mano"],
    images: [
      "https://images.unsplash.com/photo-1530968033775-2c92736b131e?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=1000&fit=crop",
    ],
    isNew: true,
  },
  {
    id: "KHL-0020",
    code: "KHL-0020",
    name: "Maceta Nido",
    price: 110,
    category: PRODUCT_CATEGORIES.PLATOS,
    date: "2026-02-20",
    collection: "Colección Tierra",
    description: "Maceta con textura tejida que abraza tus plantas con calidez artesanal.",
    details: ["Cerámica de baja temperatura", "Con drenaje", "Diámetro: 18cm", "Interior/exterior"],
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=1000&fit=crop",
    ],
  },
  {
    id: "8",
    code: "KHL-0021",
    name: "Candelabro Meditación",
    price: 58,
    category: PRODUCT_CATEGORIES.DECORACION,
    date: "2026-04-08",
    collection: "Nuevas Piezas",
    description: "Candelabro minimalista con líneas limpias para crear ambientes serenos.",
    details: ["Cerámica gres", "Para velas estándar", "Altura: 12cm", "Base antideslizante"],
    images: [
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=800&h=1000&fit=crop",
    ],
    isNew: true,
  },
];