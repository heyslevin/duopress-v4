import type { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";

import PageBuilderPage from "@/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import {
  getPageQuery,
  HOME_GET_PAGEQUERY,
  HOME_PAGES_SLUGS,
  pagesSlugs,
} from "@/sanity/lib/queries";
// import { Page as PageType } from "@/sanity.types";

// export async function generateStaticParams() {
//   const { data } = await sanityFetch({
//     query: HOME_PAGES_SLUGS,
//     perspective: "published",
//     stega: false,
//   });
//   return data;
// }

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: HOME_GET_PAGEQUERY,
    params,
    stega: false,
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: HOME_GET_PAGEQUERY, params }),
  ]);

  if (!page?._id) {
    return notFound();
  }

  return (
    <div className="my-12 lg:my-24">
      <PageBuilderPage page={page as any} />
    </div>
  );
}
