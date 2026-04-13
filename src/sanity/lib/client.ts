// src/sanity/lib/client.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url"; // 👈 Esto es lo nuevo que instalamos

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// --- AQUÍ EMPIEZA LA MAGIA PARA LAS FOTOS ---
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
