import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import React, { memo, useCallback } from 'react';

const ToggleButtonVariants = cva(
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
      /** 정답/오답 피드백 (이벤트 퀴즈 등에서 사용) */
      feedback: {
        none: '',
        correct: 'border-green-500 bg-green-50 text-green-800',
        wrong: 'border-red-500 bg-red-50 text-red-800',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        selected: true,
        feedback: 'none',
        class: 'border-selected',
      },
      {
        variant: 'outline',
        selected: false,
        feedback: 'none',
        class: 'border-slate-outline',
      },
    ],
    defaultVariants: {
      feedback: 'none',
    },
  },
);

interface ToggleButtonProps extends VariantProps<typeof ToggleButtonVariants> {
  value: string;
  text?: string;
  icon?: LucideIcon;
  onClick?: (value: string) => void;
  className?: string;
}

// eslint-disable-next-line react/display-name
export const ToggleButton = memo(
  ({
    size,
    variant,
    selected,
    feedback = 'none',
    text,
    icon,
    onClick,
    className,
    value,
  }: ToggleButtonProps) => {
    const handleClick = useCallback(() => {
      onClick?.(value);
    }, [onClick, value]);

    return (
      <button
        type='button'
        className={cn(ToggleButtonVariants({ size, variant, selected, feedback }), className)}
        onClick={handleClick}
      >
        {icon && (
          <span>
            {React.createElement(icon, {
              size: size === 'md' ? 14 : 16,
            })}
          </span>
        )}
        {text && <p>{text}</p>}
      </button>
    );
  },
);
