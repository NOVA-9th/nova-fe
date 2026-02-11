'use client';

import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { useMemo, useState, useEffect, useRef } from 'react';
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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // 드롭다운 스크롤 제어용 ref
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  // 칩 컨테이너/인풋 ref (칩 추가 시 커서 쪽으로 스크롤 + 포커스 유지)
  const chipsContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
    setHighlightedIndex(-1);
  };

  const removeChip = (chip: string) => {
    onChange(value.filter((c) => c !== chip));
  };

  const clearAll = () => {
    onInputChange('');
    onChange([]);
    setHighlightedIndex(-1);
  };

  const filteredSuggestions = useMemo(
    () =>
      suggestions.filter(
        (item) => item.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(item),
      ),
    [inputValue, suggestions, value],
  );

  // suggestions 변경 시 highlight 초기화
  useEffect(() => {
    setHighlightedIndex(filteredSuggestions.length > 0 ? 0 : -1);
  }, [filteredSuggestions]);

  // highlight가 바뀔 때마다 해당 li가 보이도록 스크롤
  useEffect(() => {
    if (highlightedIndex < 0) return;
    const el = itemRefs.current[highlightedIndex];
    if (!el) return;

    // nearest: 이미 보이면 안 움직이고, 가려지면 필요한 만큼만 스크롤
    el.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex]);

  // value가 바뀔 때(칩 추가/삭제 등) 커서 쪽(맨 오른쪽)으로 이동 + 포커스 유지
  useEffect(() => {
    const el = chipsContainerRef.current;
    if (!el) return;

    el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    inputRef.current?.focus();
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, filteredSuggestions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
          addChip(filteredSuggestions[highlightedIndex]);
        } else {
          addChip();
        }
        break;
      case ',':
        e.preventDefault();
        addChip();
        break;
      case 'Backspace':
        if (!inputValue && value.length) {
          removeChip(value[value.length - 1]);
        }
        break;
    }
  };

  return (
    <div className={cn(ChipInputVariants({ size, variant, data }), className)}>
      {icon && React.createElement(icon, { size: size === 'md' ? 14 : 16 })}

      <div
        ref={chipsContainerRef}
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
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={value.length === 0 ? placeholder : undefined}
          className='caret-color placeholder:text-optional min-w-20 flex-1 bg-transparent outline-none'
        />
      </div>

      {inputValue && filteredSuggestions.length > 0 && (
        <ul
          ref={listRef}
          className='absolute top-full left-0 w-full max-h-60 overflow-auto bg-base shadow-[2px_6px_6px_var(--shadow-suggestion)] border-ring rounded-b-static-frame thin-scrollbar'
        >
          {filteredSuggestions.map((item, index) => (
            <li
              key={item}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={cn(
                'px-4 py-2.5 typo-body-base h-12 text-optional hover:bg-surface active:bg-surface',
                highlightedIndex === index && 'bg-surface',
              )}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => addChip(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {(inputValue || value.length > 0) && (
        <button type='button' onClick={clearAll} className='text-optional'>
          <X size={size === 'md' ? 14 : 16} />
        </button>
      )}
    </div>
  );
};
