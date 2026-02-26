import { DocumentTextIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import type { Post } from '../../../sanity.types'

/**
 * Post schema.  Define and edit the fields for the 'post' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const post = defineType({
  name: 'post',
  title: 'Wpis',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'string',
      options: {
        list: [
          { title: '🚴 Rower', value: 'cycling' },
          { title: '🧠 Rozwój', value: 'mindset' },
        ],
        layout: 'radio', // Wyświetli się jako ładne kafelki do kliknięcia
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Zdjęcie główne',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Treść',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'readingTime',
      title: 'Czas czytania (minuty)',
      type: 'number',
      description: 'Wpisz szacowany czas czytania w minutach',
      // Opcjonalnie: pokaż to pole głównie dla artykułów o rozwoju
      initialValue: 5,
    }),
    // Opcjonalne pole tylko dla kategorii rowerowej
    defineField({
      name: 'bikeDetails',
      title: 'Szczegóły wyprawy (Tylko dla Roweru)',
      type: 'object',
      hidden: ({ document }) => document?.category !== 'cycling', // Ukryte, jeśli kategoria to nie rower!
      fields: [
        { name: 'distance', title: 'Dystans (km)', type: 'number' },
        { name: 'bikeModel', title: 'Model roweru', type: 'string' },
      ],
    }),
  ],
})