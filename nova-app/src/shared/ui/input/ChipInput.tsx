'use client';

import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { useState, useMemo } from 'react';
import React from 'react';
import { LucideIcon } from 'lucide-react';
import InputChip from '@/shared/ui/action/InputChip';

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
  placeholder?: string;
  icon?: LucideIcon;
  className?: string;
  suggestions?: string[]; // 외부에서 받는 추천 목록
}

const ChipInput = ({
  size,
  variant,
  data,
  placeholder,
  icon,
  className,
  suggestions = [],
}: ChipInputProps) => {
  const [value, setValue] = useState('');
  const [chips, setChips] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false);

  const addChipsFromValue = (input: string) => {
    input
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v && !chips.includes(v))
      .forEach((v) => setChips((prev) => [...prev, v]));
  };

  const addChip = (chipValue?: string) => {
    const finalValue = chipValue ?? value;
    if (!finalValue) return;
    addChipsFromValue(finalValue);
    setValue('');
  };

  const removeChip = (chip: string) => {
    setChips((prev) => prev.filter((c) => c !== chip));
  };

  const clearAll = () => {
    setValue('');
    setChips([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addChip();
    }

    if (e.key === 'Backspace' && !value && chips.length) {
      removeChip(chips[chips.length - 1]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.includes(',')) {
      addChipsFromValue(inputValue);
      setValue('');
    } else {
      setValue(inputValue);
    }
  };

  const filteredSuggestions = useMemo(
    () =>
      suggestions.filter(
        (item) => item.toLowerCase().includes(value.toLowerCase()) && !chips.includes(item),
      ),
    [value, suggestions, chips],
  );

  return (
    <div className={cn(ChipInputVariants({ size, variant, data }), className)}>
      {icon &&
        React.createElement(icon, {
          size: size === 'md' ? 14 : 16,
        })}

      <div
        className={cn(
          'no-scrollbar flex flex-1 items-center overflow-x-auto whitespace-nowrap',
          size === 'md' ? 'gap-1' : 'gap-1.5',
        )}
      >
        {chips.map((chip) => (
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
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          type='text'
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={chips.length === 0 ? placeholder : undefined}
          className='caret-color placeholder:text-charcoal-optional min-w-20 flex-1 bg-transparent outline-none'
        />
      </div>

      {value && filteredSuggestions.length > 0 && (
        <ul
          className='absolute top-full left-0 w-full max-h-60 overflow-auto bg-base 
               border-x border-b border-slate-ring rounded-b-static-frame'
        >
          {filteredSuggestions.map((item) => (
            <li
              key={item}
              className='px-4 py-2.5 typo-body-base h-12 text-charcoal-optional'
              onClick={() => addChip(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {(value || chips.length > 0) && (
        <button type='button' onClick={clearAll} className='text-charcoal-optional'>
          <X size={size === 'md' ? 14 : 16} />
        </button>
      )}
    </div>
  );
};

export default ChipInput;
