import React from "react";

import Cta from "@/app/components/blocks/Cta";
import Info from "@/app/components/blocks/InfoSection";
import Hero from "@/app/components/blocks/Hero";
import Tabs from "@/app/components/blocks/Tabs";
import Gallery from "@/app/components/blocks/Gallery";
import Paragraph from "./blocks/ParagraphSection";
import TextAndImage from "./blocks/TextAndImage";
import Form from "./blocks/Form";
import Metrics from "./blocks/Metrics";
import Accordion from "./blocks/Accordion";

type BlocksType = {
  [key: string]: React.FC<any>;
};

type BlockType = {
  _type: string;
  _id: string;
};

type BlockProps = {
  index: number;
  block: BlockType;
};

//Add your blocks here
const Blocks: BlocksType = {
  callToAction: Cta,
  infoSection: Info,
  hero: Hero,
  tabs: Tabs,
  gallery: Gallery,
  paragraph: Paragraph,
  textAndImage: TextAndImage,
  form: Form,
  metrics: Metrics,
  accordion: Accordion,
};

export default function BlockRenderer({ block, index }: BlockProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== "undefined") {
    return React.createElement(Blocks[block._type], {
      key: block._id,
      block: block,
      index: index,
    });
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div
        className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded"
        key={block._id}
      >
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._id }
  );
}
