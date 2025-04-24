## What's this?

I'm building a Page Builder using Next.js + Sanity

## Who is this for?

This is a personal project, I'm learning how to build a good looking page builder for all kinds of small companies.

## When was this started?

This is version 4, starting on January 4, 2025.

## Who is making this?

I'm a designer that is learning to code on weekends and weeknights.

## What technologies are used?

I'm using:

- React
- Next.js
- Sanity
- Tailwind

## Building a block (Basics)

### Back

- Define Schema
  /blocks/nameType.ts

- Add to Schema index
  /schemaTypes/index

- Generate types // check where in the steps this goes
  Sanity schema extract
  Sanity typegen generate

- Add to SCHEMA_ARRAY_OF_BLOCKS in constants

- Add a GROQ block query in PAGE_BUILDER_CONTENT_QUERY

### Front

- Create Component
  Name.tsx

- Type NameProps = {
  block: Name (get’s imported),
  index: number}

- Export function NameBlock({ block: NameProps})

- Add to BlockRenderer

## Building a Block (details)

### Back

- Add all schema types
  - Add Preview Icon to schema
- Update Groq
  - Check Vision so data shape is complete (images & references)
- Extract and generate types

### Front

- Update Type with Groq result generated Type
- Style it up baby
- Take a screenshot and use it in static/page-builder-thumbnails
