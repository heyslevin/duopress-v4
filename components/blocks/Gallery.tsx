import { SanityImageHotspot, SanityImageCrop } from "@/sanity/lib/types";
import { urlForImage } from "@/sanity/lib/utils";
import { Image } from "next-sanity/image";

export type Gallery = {
  _key: string;
  _type: "gallery";
  title?: string;
  gallery: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "galleryImage";
    _key: string;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "galleryImage";
      _key: string;
      imageUrl: string | null;
      blurDataUrl: string | null;
    };
  }> | null;
};

type GalleryProps = {
  block: Gallery;
  index: number;
};

export default function Gallery({ block }: GalleryProps) {
  return (
    <div className="container py-4">
      <div>{block.title}</div>
      {block.gallery?.map(({ image }) => {
        const source = urlForImage(image.asset?._ref)?.url() as string;

        return (
          <div className="relative h-48 mb-4" key={image._key}>
            <Image
              className="object-cover"
              src={image.imageUrl as string}
              alt={image.alt || ""}
              fill={true}
              key={image._key}
            />
          </div>
        );
      })}
    </div>
  );
}
