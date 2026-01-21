import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';
import React from 'react';
import { LucideIcon } from 'lucide-react';

const SectionHeaderVariants = cva('flex items-center justify-center py-0.5', {
  variants: {
    size: {
      sm: 'gap-1.5 typo-body-key',
      md: 'gap-1.5 typo-subhead-key',
      lg: 'gap-2 typo-headline-key',
    },

    peak: {
      true: 'text-base',
      false: 'text-additive',
    },
  },
});

interface SectionHeaderProps extends VariantProps<typeof SectionHeaderVariants> {
  text: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  className?: string;
}

const SectionHeader = ({
  size,
  peak,
  text = 'Label',
  leftIcon,
  rightIcon,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn(SectionHeaderVariants({ size, peak }), className)}>
      {leftIcon && (
        <span>
          {React.createElement(leftIcon, {
            size: size === 'sm' ? 16 : size === 'md' ? 18 : 20,
          })}
        </span>
      )}
      {text}
      {rightIcon && (
        <span>
          {React.createElement(rightIcon, {
            size: size === 'sm' ? 14 : size === 'md' ? 16 : 18,
          })}
        </span>
      )}
    </div>
  );
};

export default SectionHeader;
