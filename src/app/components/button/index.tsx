import classnames from 'classnames';

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  href?: string;
  textColor?: string;
  size: 'sm' | 'md' | 'lg';
}

export const Button = (props: ButtonProps): JSX.Element => {
  const { className, textColor, disabled, size, ...rest } = props;

  return (
    <Element
      className={classnames([
        `cursor-pointer relative flex justify-center items-center rounded px-5 py-2 font-semibold tracking-wider w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 ${textColor}`,
        {
          'hover:brightness-90 active:brightness-90': !disabled,
          'opacity-70': disabled,
          'cursor-not-allowed': disabled,
          'text-sm': size === 'sm',
          'text-lg': size === 'lg',
        },
        className,
      ])}
      disabled={disabled}
      size={size}
      {...rest}
    ></Element>
  );
};

const Element = (props: ButtonProps): JSX.Element => {
  const { href, onClick, ...rest } = props;

  return props.href ? (
    <div className='inline-block'>
      {props.disabled ? (
        <span {...rest}>{props.children}</span>
      ) : (
        <a {...rest} href={href} target={href?.startsWith('http') ? '_blank' : '_self'}>
          {props.children}
        </a>
      )}
    </div>
  ) : (
    <button
      {...rest}
      onClick={(e): void => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {props.children}
    </button>
  );
};
