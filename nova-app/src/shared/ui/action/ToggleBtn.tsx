import { cva } from 'class-variance-authority';
const ToggleBtnVariants = cva(
  'flex items-center justify-center rounded-interactive-default px-padding-regular py-padding-medium gap-1.5',
  {
    variants: {
      size: {
        lg: 'size-lg typo-body-base',
        md: 'size-md typo-callout-base',
      },

      variant: {
        surface: '',
        outline: '',
      },

      selected: {
        true: '',
        false: '',
      },
    },

    compoundVariants: [
      // surface + selected 조합
      {
        variant: 'surface',
        selected: true,
        class: 'bg-surface text-base',
      },
      {
        variant: 'surface',
        selected: false,
        class: 'text-optional ',
      },
      // outline + selected 조합
      {
        variant: 'outline',
        selected: true,
        class: 'bg-surface text-base border border-selected',
      },
      {
        variant: 'outline',
        selected: false,
        class: 'text-optional border border-outline ',
      },
    ],
  },
);

interface ToggleBtnProps {
  size: 'md' | 'lg';
  variant: 'surface' | 'outline';
  selected: true | false;
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function ToggleBtn({
  size,
  variant,
  selected,
  text,
  icon,
  children,
  onClick,
}: ToggleBtnProps & React.PropsWithChildren) {
  return (
    <button
      type='button'
      className={ToggleBtnVariants({ size: size, variant: variant, selected: selected })}
      onClick={onClick}
    >
      <div className='flex items-center justify-center'>{children}</div>
      {icon}
      <p className='px-0.5'>{text}</p>
    </button>
  );
}
