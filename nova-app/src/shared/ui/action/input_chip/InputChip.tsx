import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { LucideIcon, X } from 'lucide-react';
import React from 'react';

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
  icon?: LucideIcon;
  onRemove?: () => void;
  className?: string;
}

export default function InputChip({
  size,
  variant,
  text,
  icon,
  onRemove,
  className,
}: InputChipProps) {
  return (
    <div className={cn(InputChipVariants({ size, variant }), className)}>
      {icon && (
        <span className='chip-icon shrink-0'>
          {React.createElement(icon, {
            size: size === 'sm' ? 12 : 14,
          })}
        </span>
      )}
      <p className='text-base-color'>{text}</p>

      <button type='button' onClick={onRemove} className='text-additive'>
        <X size={size === 'sm' ? 12 : 14} />
      </button>
    </div>
  );
}
