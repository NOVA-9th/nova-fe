'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, Check, LucideIcon } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const SelectVariants = cva(
  `
  flex items-center justify-between
  py-padding-light px-padding-medium
  rounded-interactive-default whitespace-nowrap
  cursor-pointer
  `,
  {
    variants: {
      size: {
        md: 'size-md typo-callout-key gap-2',
        sm: 'size-sm typo-footnote-base gap-1.5',
      },
      style: {
        surface: '',
        outline: 'border',
        accent: '',
      },
    },
    compoundVariants: [
      {
        style: 'surface',
        class: 'bg-surface text-optional border-outline border-1 hover:bg-surface active:bg-surface',
      },
      {
        style: 'outline',
        class: 'hover:bg-surface active:bg-surface text-optional border-outline',
      },
      {
        style: 'accent',
        class:
          'bg-accent-surface text-accent-base hover:bg-accent-surface active:bg-accent-surface',
      },
    ],
    defaultVariants: {
      size: 'md',
      style: 'surface',
    },
  },
);

const SelectContentVariants = cva(
  `
  overflow-hidden rounded-interactive-default
  bg-base shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]
  `,
  {
    variants: {
      size: {
        md: 'min-w-[var(--radix-select-trigger-width)]',
        sm: 'min-w-[var(--radix-select-trigger-width)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const SelectItemVariants = cva(
  `
  flex items-center justify-start gap-1
  px-2 pr-4 py-padding-light
  cursor-pointer outline-none
  `,
  {
    variants: {
      size: {
        md: 'typo-callout-key',
        sm: 'typo-footnote-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface SelectProps extends VariantProps<typeof SelectVariants> {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string; icon?: LucideIcon }[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Select = ({
  value,
  onValueChange,
  options,
  placeholder = '선택하세요',
  size = 'md',
  style = 'surface',
  className,
  disabled = false,
}: SelectProps) => {
  const selectedOption = options.find((option) => option.value === value);
  const SelectedIcon = selectedOption?.icon;

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectPrimitive.Trigger
        className={cn(
          SelectVariants({ size, style }),
          value && style === 'surface' && 'text-optional',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        <div className='flex items-center gap-1'>
          {SelectedIcon && <SelectedIcon size={size === 'md' ? 16 : 12} className='shrink-0' />}
          <SelectPrimitive.Value placeholder={placeholder} />
        </div>
        <SelectPrimitive.Icon className={cn(value && style === 'surface' ? 'text-base' : 'text-optional')}>
          <ChevronDown size={size === 'md' ? 16 : 12} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn(SelectContentVariants({ size }))}
          position='popper'
          sideOffset={4}
        >
          <SelectPrimitive.Viewport className='p-1'>
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className={cn(
                  SelectItemVariants({ size }),
                  'rounded-interactive-default text-optional hover:bg-surface focus:bg-surface data-highlighted:bg-surface',
                  value === option.value && 'text-base',
                )}
              >
                <div className="w-4">
                    {value === option.value && (
                      <SelectPrimitive.ItemIndicator>
                        <Check size={size === 'md' ? 16 : 12} className='text-base' />
                      </SelectPrimitive.ItemIndicator>
                    )}
                </div>
                <div className='flex items-center justify-start gap-1'>
                  {option.icon && (
                    <div className='flex items-center justify-center w-4'>
                      <option.icon size={size === 'md' ? 14 : 12} className='shrink-0' />
                    </div>
                  )}
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                </div>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

