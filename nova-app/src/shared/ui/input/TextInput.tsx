import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { LucideIcon, X } from 'lucide-react';
import React from 'react';

const TextInputVariants = cva(
  'flex items-center rounded-interactive-default px-padding-medium py-padding-regular',
  {
    variants: {
      size: {
        md: 'gap-2.5 size-md typo-callout-base',
        lg: 'gap-3 size-lg typo-body-base',
      },
      variant: {
        surface: '',
        outline: '',
      },
      data: {
        true: '',
        false: 'border-outline hover:border-ring',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        data: true,
        class: 'border border-data-outline danger focus-within:border-data-selected',
      },
      {
        variant: 'surface',
        data: true,
        class: 'bg-data-surface danger',
      },
      {
        variant: 'surface',
        data: false,
        class: 'bg-slate-surface',
      },
      {
        variant: 'outline',
        data: false,
        class: 'border focus-within:border-selected',
      },
    ],

    defaultVariants: {
      size: 'md',
      variant: 'surface',
      data: false,
    },
  },
);

interface TextInputProps extends VariantProps<typeof TextInputVariants> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  className?: string;
}

export const TextInput = ({
  size,
  variant,
  data,
  value,
  onChange,
  placeholder,
  icon,
  className,
}: TextInputProps) => {
  return (
    <div className={cn(TextInputVariants({ size, variant, data }), className)}>
      <div className='text-additive'>
        {icon &&
          React.createElement(icon, {
            size: size === 'md' ? 14 : 16,
          })}
      </div>

      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='caret-color placeholder:text-charcoal-optional flex-1 bg-transparent outline-none'
      />

      <button type='button' onClick={() => onChange('')} className='text-charcoal-optional'>
        <X size={size === 'md' ? 14 : 16} />
      </button>
    </div>
  );
};
