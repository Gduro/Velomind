import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutMe',
  title: 'Strona O mnie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nagłówek główny',
      type: 'string',
      initialValue: 'Cześć, jestem...',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Zdjęcie profilowe',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Opis alternatywny (dla Google)',
          type: 'string',
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Moja historia',
      type: 'array',
      of: [{ type: 'block' }], // Pozwala na pogrubienia, listy i linki
    }),
    defineField({
      name: 'funFacts',
      title: 'Ciekawostki / Statystyki',
      description: 'Te małe kafelki pod tekstem (np. "Na liczniku", "W bibliotece")',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Ikona (Emoji)', type: 'string' },
            { name: 'label', title: 'Etykieta', type: 'string' },
            { name: 'value', title: 'Wartość / Opis', type: 'string' },
          ]
        }
      ]
    }),
    defineField({
      name: 'seoDescription',
      title: 'Opis SEO',
      description: 'Krótki opis, który pojawi się w wynikach wyszukiwania Google',
      type: 'text',
      rows: 3,
    }),
  ],
})