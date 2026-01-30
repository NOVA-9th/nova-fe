import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import React from 'react';

const GuidanceChipVariants = cva(
  'flex items-center justify-center rounded-interactive-default px-padding-regular py-padding-light',
  {
    variants: {
      size: {
        md: 'gap-1.5 size-md typo-callout-base',
        sm: 'gap-1 size-sm typo-footnote-base',
      },

      variant: {
        surface: 'text-additive bg-surface hover:bg-surface active:bg-surface',
        outline: 'text-additive border-ring border hover:bg-surface active:bg-surface',
        accent:
          'text-accent-base bg-accent-surface hover:bg-accent-surface active:bg-accent-surface',
      },
    },
  },
);

interface GuidanceChipProps extends VariantProps<typeof GuidanceChipVariants> {
  text?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export const GuidanceChip = ({
  size,
  variant,
  text,
  icon,
  onClick,
  className,
}: GuidanceChipProps) => {
  return (
    <button
      type='button'
      className={cn(GuidanceChipVariants({ size, variant }), className)}
      onClick={onClick}
    >
      {icon &&
        React.createElement(icon, {
          size: size === 'sm' ? 12 : 14,
        })}
      <p>{text}</p>
    </button>
  );
};
