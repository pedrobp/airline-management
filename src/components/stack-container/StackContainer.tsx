import { PropsWithChildren } from "react";

interface Props {
  title: string;
  subtitle?: string;
  borderless?: boolean;
}

function StackContainer({
  title,
  subtitle,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="container-layout h-[875px]">
      <div className="flex">
        <div className="flex-1">
          <h1>{title}</h1>
        </div>

        <h1>{subtitle}</h1>
      </div>

      <div className="flex flex-col overflow-auto gap-4 flex-1">{children}</div>
    </div>
  );
}

export default StackContainer;
