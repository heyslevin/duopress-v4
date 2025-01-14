import { defineQuery, groq } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const linkFields = /* groq */ `
    link {
      ...,
      _type == "link" => {
        "page": page->slug.current,
        "post": post->slug.current
      }
    }
`;

const heroLinkFields = /* groq */ `
    button {
      ...,
      buttonText,
      link {
        ...,
        _type == "link" => {
          "page": page->slug.current,
          "post": post->slug.current
        }
      }
    }
`;

//To-do: have one for home and not home
const PAGE_BUILDER_CONTENT_QUERY = /* groq */ `
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ...,
        ${linkFields},
      },
      _type == "hero" => {
        ...,
        ${heroLinkFields},
      },
      _type == "tabs" => {
        ...,
        "tabs": tabs[] {
          ...,
          "image": image {
            ...,
            "imageUrl": asset->.url,
            "blurDataUrl": asset->.metadata.lqip,
          }
        }
      },
      _type == "gallery" => {
        ...,
        "gallery": gallery[] {
          ...,
          "image": {
            ...,
            "imageUrl": asset->.url,
            "blurDataUrl": asset->.metadata.lqip,
          }
        }
      }
    },
    _type == "paragraph" => {
      ...,
    },
    _type == "textAndImage" => {
      ...,
      "image": {
            ...,
            "imageUrl": asset->.url,
            "blurDataUrl": asset->.metadata.lqip,
          }
    },
    _type == "form" => {
      ...,
    },
    _type == "metrics" => {
      ...,
    },
    _type == "accordion" => {
      ...,
    }
`;

export const GET_NAV_LINKS = defineQuery(`
  *[_type == "header"][0] {
  ...,
  navigation[] {
    ...,
    "link": link {
      ...,
      "page": page->.slug.current,
    }
  }
}
  `);

export const HOME_GET_PAGEQUERY = defineQuery(`
  *[_type == 'page' && isHome.status == true][0]{
    _id,
    name,
    slug,
    heading,
    subheading,
    ${PAGE_BUILDER_CONTENT_QUERY},
  }
`);

PAGE_BUILDER_CONTENT_QUERY;
export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    name,
    slug,
    heading,
    subheading,
    ${PAGE_BUILDER_CONTENT_QUERY},
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkFields}
    }
  },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const HOME_PAGES_SLUGS = defineQuery(`
  *[_type == "page" && isHome.status==true && defined(slug.current)]
  {"slug": slug.current}
`);

// const PAGE_BUILDER_CONTENT_QUERY = defineQuery(`
//   content[] {
//     ...,
//     defined(projectLinkArea.externalUrl) => {
//       "url": projectLinkArea.externalUrl,
//       openInNewWindow
//     },
//     defined(image) => {
//       "image": image {
//         ...,
//         "imageUrl": asset->.url,
//         "blurDataURL": asset->.metadata.lqip
//       }
//     },
//     defined(images) => {
//       "images": images[] {
//         ...,
//         "imageUrl": asset->.url,
//         "blurDataURL": asset->.metadata.lqip
//       }
//     },
//     defined(tabs) => {
//       tabs[] {
//         ...,
//         "image": image {
//           ...,
//           "imageUrl": asset->.url,
//           "blurDataURL": asset->.metadata.lqip
//         }
//       }
//     },
//     defined(accordion) => {
//       accordion[] {
//         ...
//       }
//     },
//     defined(projects) => {
//       title,
//       heading,
//       projects[]-> {
//         gallery,
//         projectInfo[] {
//           title,
//           text
//         },
//         title,
//         status,
//         defined(projectLinkArea.externalUrl) => {
//           "url": projectLinkArea.externalUrl,
//           openInNewWindow,
//           urlTitle
//         },
//         gallery[] {
//           _key,
//           alt,
//           "imageUrl": asset->.url,
//           "blurDataURL": asset->.metadata.lqip
//         }
//       }
//     }
//   }
// `);
// export const HOME_PAGE_BUILDER_QUERY = defineQuery(`
// *[_type == "pageBuilder" && isHomepage == true] {
//   title,
//   slug,
//   ${PAGE_BUILDER_CONTENT_QUERY}

// }[0]
// `);
