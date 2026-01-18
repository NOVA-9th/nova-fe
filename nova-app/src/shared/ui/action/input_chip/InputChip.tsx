import { cn } from '@/shared/utils/cn';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';

const InputChipVariants = cva(
  'flex items-center justify-center rounded-interactive-default px-padding-regular py-padding-light gap-1',
  {
    variants: {
      size: {
        md: 'size-md typo-callout-base',
        sm: 'size-sm typo-footnote-base',
      },

      variant: {
        surface: 'hover:bg-surface bg-surface text-base border-ring-width border-ring',
        outline: 'text-optional border-ring border',
      },
    },
  },
);

interface InputChipProps {
  size: 'sm' | 'md';
  variant: 'surface' | 'outline';
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
}: InputChipProps & React.PropsWithChildren) {
  return (
    <button
      type='button'
      className={cn(InputChipVariants({ size, variant }), className)}
      onClick={onClick}
    >
      <span className='text-additive'>{icon}</span>
      <p className='text-base-color'>{text}</p>
      <X className='text-additive' size={size === 'sm' ? 12 : 14} />
    </button>
  );
}
