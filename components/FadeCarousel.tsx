"use client";

import * as React from "react";

import { UseEmblaCarouselType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Image } from "next-sanity/image";
import { urlForImage } from "@/sanity/lib/utils";

type FadeCarouselProps = {
  items: any;
  options?: any;
};

export function FadeCarousel({ items, options }: FadeCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Fade(),
        Autoplay({ stopOnMouseEnter: true, delay: options.delay }),
      ]}
      className=""
    >
      <CarouselContent>
        {items.map((item: any) => {
          const image = item.image;
          return (
            <CarouselItem key={item._key} className="">
              <div className="overflow-hidden rounded-lg">
                {item.industry && item.client && (
                  <div className="absolute bottom-0 mb-2 ml-2 flex flex-row rounded-full bg-white/50 p-2 px-3 text-black backdrop-blur-md">
                    <p className="text-sm">{item.client}&nbsp;</p>
                    <p className="whitespace-nowrap text-sm text-stone-600">
                      · {item.industry}
                    </p>
                  </div>
                )}
                <Image
                  className="object-cover"
                  src={urlForImage(image)?.url() as string}
                  alt={image.alt}
                  width={2000}
                  height={2000}
                  placeholder="blur"
                  blurDataURL={image.fullAsset.metadata.lqip}
                />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
