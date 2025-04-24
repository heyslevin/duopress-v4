export type Accordion = {
  _key: string;
  _type: "accordion";
  title?: string;
  caption?: string;
  heading?: string;
  text?: string;
  accordionItems?: Array<{
    title?: string;
    description?: string;
    _type: "item";
    _key: string;
  }>;
};

type AccordionProps = {
  index: number;
  block: Accordion;
};

export default function Accordion({ block }: AccordionProps) {
  return (
    <div className="container py-4 border-gray-300 border-2">
      <div className="text-sm">{block.caption}</div>
      <div className="text-xl">{block.heading}</div>
      <div className="text-base">{block.text}</div>
      <div className="border-red-300">
        {block.accordionItems?.map((item) => {
          return (
            <div className="" id={item._key}>
              <div className="text-base">{item.title}</div>
              <div className="text-sm">{item.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
