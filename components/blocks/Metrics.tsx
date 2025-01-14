export type Metrics = {
  _key: string;
  _type: "metrics";
  title?: string;
  caption?: string;
  heading?: string;
  text?: string;
  metrics?: Array<{
    heading?: string;
    caption?: string;
    text?: string;
    _type: "metricItem";
    _key: string;
  }>;
};

type MetricProps = {
  block: Metrics;
  index: number;
};

export default function Metrics({ block }: MetricProps) {
  return (
    <div className="container py-4">
      <div className="text-sm">{block.caption}</div>
      <div className="text-xl">{block.heading}</div>
      <div className="text-base">{block.text}</div>
      <div className="">
        {block.metrics?.map((item) => {
          return (
            <div className="border-gray-100 border-2 p-2" key={item._key}>
              <div className="">{item.heading}</div>
              <div className="">{item.caption}</div>
              <div className="">{item.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
