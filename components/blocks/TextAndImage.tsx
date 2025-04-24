import { Link, SanityImageCrop, SanityImageHotspot } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { Image } from "next-sanity/image";

export type TextAndImage = {
  _key: string;
  _type: "textAndImage";
  title?: string;
  caption?: string;
  heading?: string;
  text?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  button?: {
    buttonText?: string;
    link?: Link;
  };
};

type TextAndImageProps = {
  index: number;
  block: TextAndImage;
};

export default function TextAndImage({ block }: TextAndImageProps) {
  const source = urlForImage(block.image)?.url();

  return (
    <div className="container">
      <div className="">{block.caption}</div>
      <div className="">{block.heading}</div>
      <div className="">{block.text}</div>
      {/* Missing href */}
      <a href="">
        <button>{block.button?.buttonText}</button>
      </a>
      <div className="relative h-32 w-full bg-red-300">
        {block.image && (
          <Image
            className="object-cover"
            fill={true}
            src={urlForImage(block.image)?.url() as string}
            alt={block.image?.alt as string}
          />
        )}
      </div>
    </div>
  );
}
