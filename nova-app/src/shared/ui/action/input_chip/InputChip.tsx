import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const ICON_SIZE_BY_CHIP_SIZE = {
  sm: 12,
  md: 14,
} as const;

const InputChipVariants = cva(
  'flex items-center justify-center rounded-interactive-default px-padding-regular py-padding-light',
  {
    variants: {
      size: {
        md: 'gap-1.5 size-md typo-callout-base',
        sm: 'gap-1 size-sm typo-footnote-base',
      },

      variant: {
        surface: 'hover:bg-surface bg-surface text-base border-ring-width border-ring',
        outline: 'text-optional border-outline border hover:border-ring',
      },
    },
  },
);

interface InputChipProps extends VariantProps<typeof InputChipVariants> {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function InputChip({
  size,
  variant,
  text,
  icon,
  onClick,
  className,
}: InputChipProps) {
  return (
    <button
      type='button'
      className={cn(InputChipVariants({ size, variant }), className)}
      onClick={onClick}
    >
      <span className='text-additive'>{icon}</span>
      <p className='text-base-color'>{text}</p>
      <X className='text-additive' size={ICON_SIZE_BY_CHIP_SIZE[size ?? 'md']} />
    </button>
  );
}
