import {defineField, defineType} from 'sanity'

// To do: Add Rest of fields

export default defineType({
  name: 'header',
  title: 'Header Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'navigation',
      type: 'array',
      of: [
        defineField({
          name: 'navLink',
          type: 'navLink',
        }),
      ],
    }),
  ],
})
