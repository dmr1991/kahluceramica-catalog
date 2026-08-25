import { type SchemaTypeDefinition } from "sanity";
import product from "./product"; // importando los schemas
import { kahlu } from './kahlu'
import { workshops } from './workshops'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, kahlu, workshops], 
};
