import {
  Hero as HeroType,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity/lib/types";
import { Suspense } from "react";
import ResolvedLink from "../ResolvedLink";

export type Hero = {
  _key: string;
  _type: "hero";
  title?: string;
  caption?: string;
  heading?: string;
  button: {
    buttonText: string | null;
    link: {
      _type: "link";
      linkType?: "href" | "page";
      href?: string;
      page: string | null;
      linkToSection?: string;
      openInNewTab?: boolean;
      post: null;
    } | null;
  } | null;
};

type HeroProps = {
  block: Hero;
  index: number;
};

export default function Hero({ block }: HeroProps) {
  return (
    <main className="container flex flex-col text-center justify-center gap-3">
      <h2 className="text-base">{block.caption}</h2>
      <h1 className="text-5xl justify-center">{block.heading}</h1>

      <Suspense fallback={null}>
        <div className="flex justify-center items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <ResolvedLink
            link={block.button?.link}
            className="rounded-full flex gap-2 mt-4 items-center bg-black hover:bg-red-500 focus:bg-cyan-500 py-3 px-6 text-white transition-colors duration-200"
          >
            {block.button?.buttonText}
          </ResolvedLink>
        </div>
      </Suspense>
    </main>
  );
}
