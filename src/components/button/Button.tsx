import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon' | 'secondary';
}

function Button({ variant = 'primary', children, ...props }: PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      className={clsx(
        'outline-none px-4 py-2 border-none rounded-md transition-all text-sm',
        {
          'bg-accent text-white font-semibold hover:bg-opacity-80': variant === 'primary',
          'bg-transparent text-primary font-semibold hover:bg-hover': variant === 'secondary',
          'bg-transparent text-primary h-6 w-6 px-2 grid place-content-center hover:bg-hover': variant === 'icon',
        },
        props.className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
