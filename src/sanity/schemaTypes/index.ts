import { type SchemaTypeDefinition } from "sanity";
import product from "./product"; // 👈 Importamos tu molde de productos

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product], 
};
