// src/sanity/lib/queries.ts

import { client } from "./client";

// Función para traer solo los productos disponibles (Catálogo e Inicio)
export async function getProducts() {
  const query = `*[_type == "product" && isAvailable != false] | order(date desc) {
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
    isAvailable,
    "imageUrl": images[0].asset->url,
    description
  }`;

  const products = await client.fetch(query, {}, { next: { revalidate: 0 } });
  return products;
}

// Función para traer un solo producto por su ID (Página de detalle)
export async function getProductById(id: string) {
  const query = `*[_type == "product" && _id == $id][0] {
    _id,
    name,
    code,
    price,
    salePrice,
    onSale,
    stock,
    isMadeToOrder,
    category,
    isAvailable,
    "imageUrl": images[0].asset->url,
    description,
    details,
    "allImages": images[].asset->url
  }`;

  const product = await client.fetch(
    query,
    { id },
    { next: { revalidate: 0 } },
  );
  return product;
}
