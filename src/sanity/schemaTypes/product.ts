import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Productos",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre de la pieza",
      type: "string",
      validation: (Rule) => Rule.required().error("El nombre es obligatorio"),
    }),
    defineField({
      name: "code",
      title: "Código (SKU)",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Precio (Q)",
      type: "number",
      description: "Ingresa el valor en Quetzales",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "onSale",
      title: "¿Está en oferta?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "salePrice",
      title: "Precio de oferta (Q)",
      type: "number",
      description: "Se mostrará como el precio principal si está en oferta",
      hidden: ({ document }) => !document?.onSale,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "isMadeToOrder",
      title: "¿Es bajo pedido?",
      type: "boolean",
      description:
        "Activa esto para piezas que se producen por encargo (ej. Aurora Tumblers)",
      initialValue: false,
    }),
    defineField({
      name: "stock",
      title: "Unidades disponibles",
      type: "number",
      initialValue: 1,
      // Se oculta si la pieza es bajo pedido
      hidden: ({ document }) => !!document?.isMadeToOrder,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Decoración", value: "Decoración" },
          { title: "Tazas", value: "Tazas" },
          { title: "Sets", value: "Sets" },
          { title: "Mesa", value: "Mesa" },
          { title: "Platos", value: "Platos" },
        ],
      },
      validation: (Rule) =>
        Rule.required().error("Debes seleccionar una categoría"),
    }),
    defineField({
      name: "date",
      title: "Fecha de creación",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Imágenes",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) =>
        Rule.required().min(1).error("Agrega al menos una imagen"),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "details",
      title: "Detalles técnicos",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "isNew",
      title: "¿Es pieza nueva?",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isFeatured",
      title: "¿Destacar en Inicio?",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
