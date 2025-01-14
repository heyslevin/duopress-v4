"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { SINGLETONS } from "./sanity/lib/constants";

import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from "sanity/presentation";

const homeLocation = {
  title: "Home",
  href: "/",
} satisfies DocumentLocation;

// Function to resolve the href for a document
function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case "post":
      return slug ? `/posts/${slug}` : undefined;
    case "page":
      return slug ? `/${slug}` : undefined;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

// Define the singleton document types
const singletonTypes = new Set(SINGLETONS);

// Fix the env variable
const SANITY_STUDIO_PREVIEW_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu options
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  plugins: [
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: "/:slug",
            filter: `_type == "page" && slug.current == $slug || _id == $slug`,
          },
          {
            route: "/posts/:slug",
            filter: `_type == "post" && slug.current == $slug || _id == $slug`,
          },
        ]),
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: "This document is used on all pages",
            tone: "positive",
          }),

          //Uncomment this to add document location to pages

          // page: defineLocations({
          //   select: {
          //     name: 'name',
          //     slug: 'slug.current',
          //   },
          //   resolve: (doc) => ({
          //     locations: [
          //       {
          //         title: doc?.name || 'Untitled',
          //         href: resolveHref('page', doc?.slug)!,
          //       },
          //     ],
          //   }),
          // }),
          post: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || "Untitled",
                  href: resolveHref("post", doc?.slug)!,
                },
                {
                  title: "Home",
                  href: "/",
                } satisfies DocumentLocation,
              ].filter(Boolean) as DocumentLocation[],
            }),
          }),
        },
      },
    }),
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

// import { defineConfig } from "sanity";
// import { structureTool } from "sanity/structure";
// import { visionTool } from "@sanity/vision";
// import { schemaTypes } from "./sanity/schemaTypes";
// import { structure } from "./sanity/structure";
// import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
// import {
//   presentationTool,
//   defineDocuments,
//   defineLocations,
//   type DocumentLocation,
// } from "sanity/presentation";
// import { SINGLETONS } from "@/sanity/lib/constants";

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-projectID";
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// //Fix this
// const SANITY_STUDIO_PREVIEW_URL =
//   process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";

// const homeLocation = {
//   title: "Home",
//   href: "/",
// } satisfies DocumentLocation;

// // Function to resolve the href for a document
// function resolveHref(documentType?: string, slug?: string): string | undefined {
//   switch (documentType) {
//     case "post":
//       return slug ? `/posts/${slug}` : undefined;
//     case "page":
//       return slug ? `/${slug}` : undefined;
//     default:
//       console.warn("Invalid document type:", documentType);
//       return undefined;
//   }
// }

// // Define the actions that should be available for singleton documents
// const singletonActions = new Set(["publish", "discardChanges", "restore"]);

// // Define the singleton document types
// const singletonTypes = new Set(SINGLETONS);

// export default defineConfig({
//   name: "default",
//   title: "Clean Next.js + Sanity",

//   projectId,
//   dataset,

//   plugins: [
//     presentationTool({
//       previewUrl: {
//         origin: SANITY_STUDIO_PREVIEW_URL,
//         previewMode: {
//           enable: "/api/draft-mode/enable",
//         },
//       },
//       resolve: {
//         mainDocuments: defineDocuments([
//           {
//             route: "/:slug",
//             filter: `_type == "page" && slug.current == $slug || _id == $slug`,
//           },
//           {
//             route: "/posts/:slug",
//             filter: `_type == "post" && slug.current == $slug || _id == $slug`,
//           },
//         ]),
//         locations: {
//           settings: defineLocations({
//             locations: [homeLocation],
//             message: "This document is used on all pages",
//             tone: "positive",
//           }),

//           //Uncomment this to add document location to pages

//           // page: defineLocations({
//           //   select: {
//           //     name: 'name',
//           //     slug: 'slug.current',
//           //   },
//           //   resolve: (doc) => ({
//           //     locations: [
//           //       {
//           //         title: doc?.name || 'Untitled',
//           //         href: resolveHref('page', doc?.slug)!,
//           //       },
//           //     ],
//           //   }),
//           // }),
//           post: defineLocations({
//             select: {
//               title: "title",
//               slug: "slug.current",
//             },
//             resolve: (doc) => ({
//               locations: [
//                 {
//                   title: doc?.title || "Untitled",
//                   href: resolveHref("post", doc?.slug)!,
//                 },
//                 {
//                   title: "Home",
//                   href: "/",
//                 } satisfies DocumentLocation,
//               ].filter(Boolean) as DocumentLocation[],
//             }),
//           }),
//         },
//       },
//     }),
//     structureTool({
//       structure,
//     }),
//     unsplashImageAsset(),
//     visionTool(),
//   ],

//   schema: {
//     types: schemaTypes,
//     // Filter out singleton types from the global “New document” menu options
//     templates: (templates) =>
//       templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
//   },

//   document: {
//     // For singleton types, filter out actions that are not explicitly included
//     // in the `singletonActions` list defined above
//     actions: (input, context) =>
//       singletonTypes.has(context.schemaType)
//         ? input.filter(({ action }) => action && singletonActions.has(action))
//         : input,
//   },
// });
