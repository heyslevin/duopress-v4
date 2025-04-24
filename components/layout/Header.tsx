import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import {
  HEADER_NAVIGATION_QUERY,
  HOME_PAGES_SLUGS,
  HOMEPAGE_QUERY,
} from "@/sanity/lib/queries";
import { GET_NAV_LINKS, settingsQuery } from "@/sanity/lib/queries";

import { sanityFetch } from "@/sanity/lib/live";
import Link from "next/link";
import React from "react";
import { navUrlProcessor } from "@/lib/helpers";
import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";

export default async function Header() {
  const {
    data: { navigation, selectedAsset = "noAsset", websiteTitle },
  } = await sanityFetch({
    query: HEADER_NAVIGATION_QUERY,
  });
  const { data } = await sanityFetch({
    query: HOME_PAGES_SLUGS,
  });

  // Extract the slug from the first item in the array, or use default
  const homepageSlug = (data && data[0]?.slug) || "home";

  //Helper to process the navItem Data
  // If "home": /
  // If internal: /slug
  // If internal + section: /slug#section
  // If external: url

  // Data Shape:
  // selectedAsset {
  // name: "",
  // imageUrl: "",
  // blurDataURL: "",
  // }

  let navItemsWithUrl = navUrlProcessor(navigation, homepageSlug);

  // const navTitle = {
  //   websiteTitle: websiteTitle || "Company Name",
  // };

  // if (selectedAsset !== "noAsset") {
  //   navTitle.selectedAsset = selectedAsset;
  // }

  function NavTitle() {
    if (selectedAsset !== "noAsset") {
      return (
        <div className="md:h-7">
          <Image
            width={getImageDimensions(selectedAsset.imageUrl).width}
            height={getImageDimensions(selectedAsset.imageUrl).height}
            src={selectedAsset.imageUrl}
            className="w-full max-w-40"
            alt={selectedAsset.alt}
            layout="responsive"
          />
        </div>
      );
    } else {
      return (
        <Link className="text-xl md:text-2xl" href="/">
          {websiteTitle || "My Website"}
        </Link>
      );
    }
  }

  return (
    <div className="sticky top-0 z-10 flex w-full flex-row justify-between border-b border-gray-800 bg-white px-5 py-5 text-black">
      <div className="flex flex-row items-center justify-start">
        <NavTitle />
      </div>
      <div className="flex flex-row gap-5">
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent
              className="h-full bg-white text-left text-black sm:text-left"
              side="top"
            >
              <SheetHeader>
                <SheetTitle className="text-inherit">
                  <NavTitle />
                </SheetTitle>
                {/* <SheetDescription>Here it is</SheetDescription> */}
              </SheetHeader>
              <div className="flex flex-col pt-8 text-3xl">
                {navItemsWithUrl.map((item) => {
                  return (
                    <div
                      key={item._key}
                      className="w-full border-t border-gray-800 py-2"
                    >
                      <SheetClose asChild>
                        <Link href={item.navUrl || "#"}>{item.text}</Link>
                      </SheetClose>
                    </div>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden flex-row items-center gap-4 md:flex">
          {navItemsWithUrl.map((item) => {
            return (
              <Link key={item._key} href={item.navUrl || "#"}>
                {item.text}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
