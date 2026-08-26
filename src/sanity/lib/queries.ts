// src/sanity/lib/queries.ts

import { client } from "./client";

// Función para traer solo los productos disponibles de ENTREGA INMEDIATA (Catálogo e Inicio)
export async function getProducts() {
  const query = `*[_type == "product" && isAvailable == true && isMadeToOrder != true] | order(orderRank asc, date desc) {
    _id,
    name,
    code,
    orderRank,
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

  const products = await client.fetch(
    query,
    {},
    { cache: "no-store", next: { revalidate: 0 } },
  );
  return products;
}

// Función para traer solo las piezas bajo pedido activas (/bajo-pedido)
export async function getMadeToOrderProducts() {
  const query = `*[_type == "product" && isMadeToOrder == true && isAvailable == true] | order(orderRank asc, date desc) {
    _id,
    name,
    code,
    orderRank,
    price,
    salePrice,
    onSale,
    category,
    isAvailable,
    "imageUrl": images[0].asset->url,
    "allImages": images[].asset->url,
    description,
    details
  }`;

  const products = await client.fetch(
    query,
    {},
    { cache: "no-store", next: { revalidate: 0 } },
  );
  return products;
}

// Función para traer un solo producto por su ID (Página de detalle)
export async function getProductById(id: string) {
  const query = `*[_type == "product" && _id == $id][0] {
    _id,
    name,
    code,
    orderRank,
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
    { cache: "no-store", next: { revalidate: 0 } },
  );
  return product;
}
