import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  borderless?: boolean;
  className?: string;
}

function StackContainer({
  title,
  subtitle,
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className={clsx('container-layout', className)}>
      <div className="flex">
        <div className="flex-1">
          <h1>{title}</h1>
        </div>

        <h1>{subtitle}</h1>
      </div>

      <div className="flex flex-col overflow-auto gap-4 p-2 flex-1 border border-border-light rounded-md shadow-inner">
        {children}
      </div>
    </div>
  );
}

export default StackContainer;
