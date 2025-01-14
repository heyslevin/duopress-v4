export type Form = {
  _type: "form";
  title?: string;
  heading?: string;
  text?: string;
  items?: Array<{
    type?: "email" | "message" | "phone" | "text";
    title?: string;
    placeholder?: string;
    _type: "formItems";
    _key: string;
  }>;
};

type FormProps = {
  block: Form;
  index: number;
};

export default function Form({ block }: FormProps) {
  return (
    <div className="container">
      <div className="">{block.heading}</div>
      <div className="">{block.text}</div>
      <div className="">
        {block.items?.map((item) => {
          return (
            <>
              <div className="">{item.title}</div>
              <div className="">{item.placeholder}</div>
              <div className="">{item.type}</div>
            </>
          );
        })}
      </div>
    </div>
  );
}
