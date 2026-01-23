import { cn } from '@/shared/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import React from 'react';

const SideTabItemCustomVariants = cva(
  'flex items-center rounded-interactive-default size-lg px-padding-medium py-padding-regular',
  {
    variants: {
      peak: {
        true: 'bg-surface text-base-color',
        false: 'text-optional',
      },
      minimized: {
        true: 'flex-col justify-center typo-callout-key gap-2',
        false: 'typo-body-key gap-3',
      },
    },

    defaultVariants: {
      peak: false,
      minimized: false,
    },
  },
);

interface SideTabItemCustomProps extends VariantProps<typeof SideTabItemCustomVariants> {
  icon?: LucideIcon;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

const SideTabItemCustom = ({
  peak,
  minimized,
  className,
  icon,
  label,
  children
}: SideTabItemCustomProps) => {
  return (
    <div className={cn(SideTabItemCustomVariants({ peak, minimized }), className)}>
      {icon && (
        <span>
          {React.createElement(icon, {
            size: 16,
          })}
        </span>
      )}
      {label}
      {children}
    </div>
  );
};

export default SideTabItemCustom;
