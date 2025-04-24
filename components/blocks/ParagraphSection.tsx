import { PortableText } from "next-sanity";
import { type PortableTextBlock } from "next-sanity";
import { PortableParagraph } from "../PortableParagraph";

//Pending type

export default function ParagraphSection({ block }: any) {
  return (
    <div className="container">
      <div className="">{block.title}</div>
      <PortableText
        components={PortableParagraph as any}
        value={block.textBlock as PortableTextBlock[]}
      />
    </div>
  );
}
