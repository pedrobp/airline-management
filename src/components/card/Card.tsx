import { PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";

interface Props {
  title: string;
  subtitle?: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

function Card({
  title,
  subtitle,
  disabled = false,
  selected,
  onClick,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={clsx(
        "container-layout w-full select-none relative transition-colors",
        {
          "opacity-50": disabled,
          "cursor-pointer hover:bg-hover": !!onClick && !disabled,
        }
      )}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex items-center">
        <div className="flex-1">
          <h2 className="text-accent">{title}</h2>
        </div>

        <h2 className="font-normal text-primary">{subtitle}</h2>
      </div>

      {children}

      {selected && (
        <div
          className={clsx(
            "absolute w-[5px] top-0 left-0 bottom-0 rounded-l-md bg-accent"
          )}
        />
      )}
    </div>
  );
}

export default Card;
