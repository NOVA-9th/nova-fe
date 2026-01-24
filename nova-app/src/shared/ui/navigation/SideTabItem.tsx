import { cn } from '@/shared/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import React from 'react';

const SideTabItemVariants = cva(
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

interface SideTabItemProps extends VariantProps<typeof SideTabItemVariants> {
  icon?: LucideIcon;
  label: string;
  className?: string;
}

const SideTabItem = ({ peak, minimized, className, icon, label }: SideTabItemProps) => {
  return (
    <div className={cn(SideTabItemVariants({ peak, minimized }), className)}>
      {icon && (
        <span>
          {React.createElement(icon, {
            size: 16,
          })}
        </span>
      )}
      {label}
    </div>
  );
};

export default SideTabItem;
