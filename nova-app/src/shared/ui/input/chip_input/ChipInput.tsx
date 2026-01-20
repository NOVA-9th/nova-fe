'use client';

import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { useState } from 'react';
import InputChip from '../../action/input_chip/InputChip';

const ChipInputVariants = cva(
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
        class: 'border box-border border-data-outline danger focus-within:border-data-selected',
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
        class: 'border box-border focus-within:border-selected',
      },
    ],
  },
);

interface ChipInputProps extends VariantProps<typeof ChipInputVariants> {
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function ChipInput({
  size,
  variant,
  data,
  placeholder,
  icon,
  className,
}: ChipInputProps) {
  const [value, setValue] = useState('');
  const [chips, setChips] = useState<string[]>([]);

  const addChip = () => {
    const trimmed = value.trim();

    if (!trimmed) return;
    if (chips.includes(trimmed)) return; // chip 중복 방지
    setChips((prev) => [...prev, trimmed]);
    setValue('');
  };

  const removeChip = (chip: string) => {
    setChips((prev) => prev.filter((c) => c !== chip));
  };

  const clearAll = () => {
    setValue('');
    setChips([]);
  };

  return (
    <div className={cn(ChipInputVariants({ size, variant, data }), className)}>
      {icon && <span className='text-charcoal-additive'>{icon}</span>}

      <div className='no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap'>
        {chips.map((chip) => (
          <InputChip
            key={chip}
            size='sm'
            variant='surface'
            text={chip}
            onRemove={() => removeChip(chip)}
          />
        ))}

        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addChip();
            }

            if (e.key === 'Backspace' && !value && chips.length) {
              removeChip(chips[chips.length - 1]);
            }
          }}
          placeholder={chips.length === 0 ? placeholder : undefined}
          className='caret-theme placeholder:text-charcoal-optional min-w-20 flex-1 bg-transparent outline-none'
        />
      </div>

      {(value || chips.length > 0) && (
        <button type='button' onClick={clearAll} className='text-charcoal-optional'>
          <X size={size === 'md' ? 14 : 16} />
        </button>
      )}
    </div>
  );
}
