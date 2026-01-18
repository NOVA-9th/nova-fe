import { cn } from '@/shared/utils/cn';
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
      {
        variant: 'surface',
        selected: true,
        class: 'hover:bg-surface bg-surface text-base',
      },
      {
        variant: 'surface',
        selected: false,
        class: 'text-optional ',
      },
      {
        variant: 'outline',
        selected: true,
        class: 'hover:bg-surface bg-surface text-base border border-selected',
      },
      {
        variant: 'outline',
        selected: false,
        class: 'hover:bg-interaction-surface text-optional border border-outline ',
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
  className?: string;
}

export default function ToggleBtn({
  size,
  variant,
  selected,
  text,
  icon,
  onClick,
  className,
}: ToggleBtnProps & React.PropsWithChildren) {
  return (
    <button
      type='button'
      className={cn(ToggleBtnVariants({ size, variant, selected }), className)}
      onClick={onClick}
    >
      <span>{icon}</span>
      <p>{text}</p>
    </button>
  );
}
