import { TITLE_DESCRIPTION, TITLE_TEXT } from "@/sanity/lib/constants";
import { formatString } from "@/sanity/lib/helpers";
import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "object",
  fieldsets: [
    { name: "settings", title: "Settings" },
    { name: "content", title: "Content" },
  ],
  fields: [
    defineField({
      name: "title",
      title: TITLE_TEXT,
      type: "string",
      fieldset: "settings",
      description: TITLE_DESCRIPTION,
      validation: (Rule) => Rule.required(),
      hidden: true,
    }),
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      fieldset: "content",
    }),
    defineField({
      name: "caption",
      type: "string",
      fieldset: "content",
      description: "Small Text above Heading",
    }),
    defineField({
      name: "button",
      type: "object",
      fields: [
        defineField({
          name: "buttonText",
          title: "Button Text",
          type: "string",
        }),
        defineField({
          name: "link",
          title: "Button Link",
          type: "link",
        }),
      ],
    }),
  ],
  icon: () => <Star size={16} />,
  preview: {
    select: {
      heading: "heading",
    },
    prepare({ heading }) {
      return {
        title: "Hero",
        subtitle: heading ? formatString(heading, 50) : "Untitled",
      };
    },
  },
});
