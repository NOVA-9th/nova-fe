'use client';

import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { useMemo, useState } from 'react';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { InputChip } from '@/shared/ui';

const ChipInputVariants = cva(
  'flex items-center rounded-interactive-default px-padding-medium py-padding-regular relative',
  {
    variants: {
      size: {
        md: 'gap-2.5 size-md typo-callout-base',
        lg: 'gap-3 size-lg typo-body-base',
      },
      variant: {
        surface: '',
        outline: 'border box-border',
      },
      data: {
        true: 'border-data-outline danger',
        false: 'border-outline hover:border-ring',
      },
    },
    compoundVariants: [
      { variant: 'outline', data: true, class: 'focus-within:border-data-selected' },
      { variant: 'surface', data: true, class: 'bg-data-surface danger' },
      { variant: 'surface', data: false, class: 'bg-slate-surface' },
      { variant: 'outline', data: false, class: 'focus-within:border-selected' },
    ],
  },
);

interface ChipInputProps extends VariantProps<typeof ChipInputVariants> {
  value: string[];
  onChange: (chips: string[]) => void;

  inputValue: string;
  onInputChange: (value: string) => void;

  onAdd?: (chip: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  className?: string;
  suggestions?: string[];
}

export const ChipInput = ({
  size,
  variant,
  data,
  placeholder,
  icon,
  className,
  suggestions = [],
  value,
  onChange,
  inputValue,
  onInputChange,
  onAdd,
}: ChipInputProps) => {
  const [isComposing, setIsComposing] = useState(false);

  const addChip = (raw?: string) => {
    const finalValue = raw ?? inputValue;
    if (!finalValue.trim()) return;

    const newChips = finalValue
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v && !value.includes(v));

    if (newChips.length) {
      onChange([...value, ...newChips]);
      newChips.forEach((chip) => onAdd?.(chip));
    }

    onInputChange('');
  };

  const removeChip = (chip: string) => {
    onChange(value.filter((c) => c !== chip));
  };

  const clearAll = () => {
    onInputChange('');
    onChange([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addChip();
    }

    if (e.key === 'Backspace' && !inputValue && value.length) {
      removeChip(value[value.length - 1]);
    }
  };

  const filteredSuggestions = useMemo(
    () =>
      suggestions.filter(
        (item) => item.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(item),
      ),
    [inputValue, suggestions, value],
  );

  return (
    <div className={cn(ChipInputVariants({ size, variant, data }), className)}>
      {icon && React.createElement(icon, { size: size === 'md' ? 14 : 16 })}

      <div
        className={cn(
          'no-scrollbar flex flex-1 items-center overflow-x-auto whitespace-nowrap',
          size === 'md' ? 'gap-1' : 'gap-1.5',
        )}
      >
        {value.map((chip) => (
          <InputChip
            key={chip}
            size={size === 'md' ? 'sm' : 'md'}
            variant='surface'
            text={chip}
            onRemove={() => removeChip(chip)}
            className={size === 'md' ? 'h-6' : 'h-8'}
          />
        ))}

        <input
          type='text'
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={value.length === 0 ? placeholder : undefined}
          className='caret-color placeholder:text-charcoal-optional min-w-20 flex-1 bg-transparent outline-none'
        />
      </div>

      {inputValue && filteredSuggestions.length > 0 && (
        <ul className='absolute top-full left-0 w-full max-h-60 overflow-auto bg-base shadow-[2px_6px_6px_0_rgba(0,0,0,0.25)] border-slate-ring rounded-b-static-frame thin-scrollbar'>
          {filteredSuggestions.map((item) => (
            <li
              key={item}
              className='px-4 py-2.5 typo-body-base h-12 text-charcoal-optional hover:bg-surface active:bg-surface'
              onClick={() => addChip(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {(inputValue || value.length > 0) && (
        <button type='button' onClick={clearAll} className='text-charcoal-optional'>
          <X size={size === 'md' ? 14 : 16} />
        </button>
      )}
    </div>
  );
};
