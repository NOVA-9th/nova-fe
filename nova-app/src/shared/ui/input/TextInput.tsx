'use client';

import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { LucideIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import useDebounce from '@/shared/hooks/useDebounce';

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
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
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
      disabled: false,
    },
  },
);

interface TextInputProps extends VariantProps<typeof TextInputVariants> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  className?: string;
  debounceMs?: number;
  disabled?: boolean;
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
  debounceMs = 500,
  disabled = false,
}: TextInputProps) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, debounceMs);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, value, onChange]);

  return (
    <div className={cn(TextInputVariants({ size, variant, data, disabled }), className)}>
      <div className='text-additive'>
        {icon &&
          React.createElement(icon, {
            size: size === 'md' ? 14 : 16,
          })}
      </div>

      <input
        type='text'
        value={localValue}
        onChange={(e) => {
          if (disabled) return;
          setLocalValue(e.target.value);
        }}
        placeholder={placeholder}
        disabled={disabled}
        className='caret-color placeholder:text-optional flex-1 bg-transparent outline-none disabled:cursor-not-allowed'
      />

      {localValue && (
        <button
          type='button'
          onClick={() => {
            if (disabled) return;
            setLocalValue('');
          }}
          disabled={disabled}
          className='text-optional hover:text-optional active:text-optional disabled:cursor-not-allowed'
        >
          <X size={size === 'md' ? 14 : 16} />
        </button>
      )}
    </div>
  );
};
