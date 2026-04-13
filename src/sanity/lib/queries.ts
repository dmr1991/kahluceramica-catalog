// src/sanity/lib/queries.ts

import { client } from "./client"; // 👈 ¡Esta línea es la que te falta!

// Función para traer todos los productos (Catálogo e Inicio)
export async function getProducts() {
  const query = `*[_type == "product"] | order(date desc) {
    _id,
    name,
    price,
    salePrice,
    onSale,
    stock,
    isMadeToOrder,
    category,
    isFeatured,
    isNew,
    "imageUrl": images[0].asset->url,
    description
  }`;

  const products = await client.fetch(query);
  return products;
}

// Función para traer un solo producto por su ID (Página de detalle)
export async function getProductById(id: string) {
  const query = `*[_type == "product" && _id == $id][0] {
    _id,
    name,
    price,
    salePrice,
    onSale,
    stock,
    isMadeToOrder,
    category,
    "imageUrl": images[0].asset->url,
    description,
    "allImages": images[].asset->url
  }`;

  const product = await client.fetch(query, { id });
  return product;
}
