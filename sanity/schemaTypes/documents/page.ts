import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {Globe} from 'lucide-react'

export const SCHEMA_ARRAY_OF_BLOCKS = [
  {type: 'callToAction'},
  {type: 'infoSection'},
  {type: 'hero'},
  {type: 'tabs'},
  {type: 'gallery'},
  {type: 'paragraph'},
  {type: 'textAndImage'},
  {type: 'form'},
  {type: 'metrics'},
  {type: 'accordion'},
]

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: Globe,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      hidden: true,
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'isHome',
      title: 'Homepage Status',
      type: 'object',
      hidden: true,
      fields: [
        defineField({
          name: 'status',
          title: 'Set as homepage',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),

    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      of: SCHEMA_ARRAY_OF_BLOCKS,
      // options: {
      //   insertMenu: {
      //     views: [
      //       {
      //         name: 'grid',
      //         previewImageUrl: (schemaTypeName) =>
      //           `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
      //       },
      //     ],
      //   },
      // },
    }),
  ],
})
