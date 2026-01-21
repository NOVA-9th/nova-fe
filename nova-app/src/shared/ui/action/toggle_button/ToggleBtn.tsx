import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import React from 'react';
const ToggleBtnVariants = cva(
  'flex items-center justify-center rounded-interactive-default px-padding-regular py-padding-medium gap-1.5 hover:bg-surface active:bg-surface',
  {
    variants: {
      size: {
        lg: 'size-lg typo-body-base',
        md: 'size-md typo-callout-base',
      },

      variant: {
        surface: '',
        outline: 'border',
      },

      selected: {
        true: 'bg-surface text-base-color',
        false: 'text-optional',
      },
    },

    compoundVariants: [
      {
        variant: 'outline',
        selected: true,
        class: ' border-selected',
      },
      {
        variant: 'outline',
        selected: false,
        class: '',
      },
    ],
  },
);

interface ToggleBtnProps extends VariantProps<typeof ToggleBtnVariants> {
  text?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

const ToggleBtn = ({ size, variant, selected, text, icon, onClick, className }: ToggleBtnProps) => {
  return (
    <button
      type='button'
      className={cn(ToggleBtnVariants({ size, variant, selected }), className)}
      onClick={onClick}
    >
      <span>
        {' '}
        {icon &&
          React.createElement(icon, {
            size: size === 'md' ? 14 : 16,
          })}
      </span>
      <p>{text}</p>
    </button>
  );
};

export default ToggleBtn;
