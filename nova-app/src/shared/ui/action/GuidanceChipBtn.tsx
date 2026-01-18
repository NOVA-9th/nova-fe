import { cn } from '@/shared/utils/cn';
import { cva } from 'class-variance-authority';

const GuidanceChipBtnVariants = cva(
  'flex items-center justify-center rounded-interactive-default px-padding-regular py-padding-light',
  {
    variants: {
      size: {
        md: 'gap-1.5 size-md typo-callout-base',
        sm: 'gap-1 size-sm typo-footnote-base',
      },

      variant: {
        surface: '',
        outline: '',
        accent: '',
      },
    },

    compoundVariants: [
      {
        variant: 'surface',
        class: 'text-additive bg-surface hover:bg-surface',
      },
      {
        variant: 'outline',
        class: 'text-additive border-ring border',
      },
      {
        variant: 'accent',
        class: 'text-accent-base bg-accent-surface hover:bg-accent-surface ',
      },
    ],
  },
);

interface InputChipBtnProps {
  size: 'sm' | 'md';
  variant: 'surface' | 'outline' | 'accent';
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function GuidanceChipBtn({
  size,
  variant,
  text,
  icon,
  onClick,
  className,
}: InputChipBtnProps & React.PropsWithChildren) {
  return (
    <button
      type='button'
      className={cn(GuidanceChipBtnVariants({ size, variant }), className)}
      onClick={onClick}
    >
      {icon}
      <p>{text}</p>
    </button>
  );
}
