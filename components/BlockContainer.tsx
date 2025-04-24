import { cn } from "@/lib/utils";

interface BlockContainerProps {
  children?: React.ReactNode;
  className?: string;
  size?: keyof typeof STYLES;
  lang?: string;
  id?: string;
}

interface StyleType {
  height: string;
}

const STYLES: Record<string, StyleType> = {
  lg: { height: "md:h-[745px]" },
};

export default function BlockContainer({
  children,
  className,
  size,
  id,
  ...delegated
}: BlockContainerProps) {
  const styles: StyleType = size ? STYLES[size] : { height: "" };

  return (
    // className="md:h-[745px] md:py-10 relative flex w-full items-center justify-center overflow-hidden bg-[#1868FF]"
    <section
      id={id}
      className={cn(
        "flex w-full items-center justify-center px-4 py-16 md:px-10 md:py-12",
        styles?.height || "",
        className || "",
      )}
      {...delegated}
    >
      {/* Block Container  */}
      {children}
    </section>
  );
}
