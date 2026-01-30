'use client';

import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { useState } from 'react';

const SwitchInputVariants = cva('flex items-center gap-2.5', {
  variants: {
    size: {
      lg: 'typo-body-base',
      md: 'typo-callout-base',
      sm: 'typo-footnote-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const SwitchToggleVariants = cva(
  'relative rounded-full p-0.5 transition-all duration-150 ease-in-out focus:outline-none',
  {
    variants: {
      size: {
        lg: 'w-11 h-6',
        md: 'w-9 h-5',
        sm: 'w-7 h-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const SwitchThumbVariants = cva(
  'rounded-full shadow-lg transform transition-all duration-150 ease-in-out flex items-center justify-center',
  {
    variants: {
      size: {
        lg: 'w-5 h-5',
        md: 'w-4 h-4',
        sm: 'w-3 h-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

interface SwitchInputProps extends VariantProps<typeof SwitchInputVariants> {
  label: string;
  className?: string;
}

export const SwitchInput = ({ label, className, size }: SwitchInputProps) => {
  const [isSwitched, setIsSwitched] = useState(false);

  return (
    <div className={cn(SwitchInputVariants({ size }), className)}>
      <button
        type='button'
        onClick={() => setIsSwitched((prev) => !prev)}
        className={clsx(SwitchToggleVariants({ size }), isSwitched ? 'bg-peak' : 'bg-surface')}
      >
        <div
          className={clsx(
            SwitchThumbVariants({ size }),
            isSwitched
              ? size === 'lg'
                ? 'translate-x-5 bg-alternative'
                : size === 'md'
                  ? 'translate-x-4 bg-alternative'
                  : 'translate-x-3 bg-alternative'
              : 'translate-x-0 bg-static',
          )}
        />
      </button>

      <span className={clsx(isSwitched ? 'text-base-color' : 'text-additive')}>{label}</span>
    </div>
  );
};
