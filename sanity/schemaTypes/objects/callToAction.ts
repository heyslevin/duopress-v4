import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

export default defineType({
  name: 'callToAction',
  title: 'Call to action',
  type: 'object',
  icon: BulbOutlineIcon,
  // This is a custom validation rule that requires both 'buttonText' and 'link' to be set, or neither to be set
  validation: (Rule) =>
    Rule.custom((fields) => {
      const {buttonText, link} = fields || {}
      if ((buttonText && link) || (!buttonText && !link)) {
        return true
      }
      return 'Both Button text and Button link must be set, or both must be empty'
    }),
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Button link',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title,
        subtitle: 'Call to Action',
      }
    },
  },
})
