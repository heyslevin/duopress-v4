import {
  SanityImageAsset,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { Image } from "next-sanity/image";

export type Tabs = {
  _type: "tabs";
  title?: string;
  caption?: string;
  heading?: string;
  tabs: Array<{
    heading?: string;
    description?: string;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
      imageUrl: string | null;
      blurDataUrl: string | null;
    } | null;
    _type: "tab";
    _key: string;
  }>;
};

type TabsProps = {
  block: Tabs;
  index: number;
};

export default function Tabs({ block }: TabsProps) {
  return (
    <div className="container py-4">
      <div className="text-xl">{block.heading}</div>
      <div className="">
        {block.tabs?.map((tab) => {
          const image = tab?.image?.asset?._ref;

          return (
            <div key={tab?._key}>
              <div className="">{tab?.description}</div>
              <div className="">{tab?.heading}</div>
              <div className="relative h-96 bg-slate-400">
                <Image
                  className="object-cover"
                  alt={tab?.image?.alt || ""}
                  src={tab?.image?.imageUrl as string}
                  fill={true}
                  // width={100}
                  // height={100}
                />
              </div>
              {/* <picture className="flex w-full h-3 object-cover overflow-hidden bg-slate-500"></picture> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
