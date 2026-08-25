import { defineField, defineType } from "sanity";

export const kahlu = defineType({
  name: "kahlu",
  title: "Sobre Kahlu",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título Principal",
      type: "string",
      initialValue: "Kahlu",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo / Encabezado corto",
      type: "string",
      initialValue: "Ceramista artesanal",
    }),
    defineField({
      name: "bioImage",
      title: "Foto Principal (Retrato / Taller)",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto alternativo (Alt text)",
          initialValue: "Artista ceramista trabajando en su taller",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bioHeading",
      title: "Título de la historia",
      type: "string",
      initialValue: "El camino al barro",
    }),
    defineField({
      name: "bioParagraphs",
      title: "Párrafos de la historia",
      type: "array",
      of: [{ type: "text" }],
      description: "Agrega cada párrafo de la historia por separado.",
    }),
    defineField({
      name: "quote",
      title: "Cita destacada",
      type: "text",
      rows: 3,
      initialValue:
        "La cerámica enseña a ir despacio: dejar que las manos escuchen al barro, que la tierra recuerde su forma, y que cada pieza guarde algo del mundo que la inspiró.",
    }),
    defineField({
      name: "processGallery",
      title: "Galería de fotos del taller y proceso",
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
            {
              name: "caption",
              type: "string",
              title: "Pie de foto (opcional)",
            },
          ],
        },
      ],
    }),
  ],
});
