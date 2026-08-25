import { defineField, defineType } from "sanity";

export const workshops = defineType({
  name: "workshop",
  title: "Workshops / Talleres",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nombre del Taller",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (Identificador URL)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Foto de Portada del Taller",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto alternativo",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Fecha y Hora",
      type: "datetime",
      description: "Fecha en la que se impartirá el taller",
    }),
    defineField({
      name: "duration",
      title: "Duración estimada (ej. 3 horas)",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Ubicación / Taller",
      type: "string",
      initialValue: "Taller Kahlu, Guatemala",
    }),
    defineField({
      name: "price",
      title: "Precio (ej. Q350 / $45)",
      type: "string",
    }),
    defineField({
      name: "spots",
      title: "Cupo disponible / Total (ej. 6 personas)",
      type: "string",
    }),
    defineField({
      name: "includes",
      title: "¿Qué incluye el taller?",
      type: "array",
      of: [{ type: "string" }],
      description: "Ej: Arcilla, quemas, esmaltado, café/snack",
    }),
    defineField({
      name: "description",
      title: "Descripción y temario",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "gallery",
      title: "Galería de fotos de talleres anteriores",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Descripción de la foto",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "isActive",
      title: "Taller Activo / Inscripciones abiertas",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
