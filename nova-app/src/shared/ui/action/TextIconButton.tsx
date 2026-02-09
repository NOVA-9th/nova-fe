import { cn } from '@/shared/utils/cn';
import { VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import React, { memo } from 'react';
import { ButtonVariants } from '@/shared/ui/styles/button.styles';

interface TextIconButtonProps extends VariantProps<typeof ButtonVariants> {
  onClick?: () => void;
  label: string;
  className?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  disabled?: boolean;
}

export const TextIconButton = memo(
  ({
    onClick,
    className,
    label,
    style,
    size,
    peak,
    leftIcon,
    rightIcon,
    disabled = false,
  }: TextIconButtonProps) => {
    return (
      <button
        type='button'
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        className={cn(
          ButtonVariants({ size, style, peak }),
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        {leftIcon && (
          <span>
            {React.createElement(leftIcon, {
              size: size === 'sm' ? 12 : size === 'md' ? 14 : 16,
            })}
          </span>
        )}
        <span className='px-0.5'>{label}</span>
        {rightIcon && (
          <span>
            {React.createElement(rightIcon, {
              size: size === 'sm' ? 12 : size === 'md' ? 14 : 16,
            })}
          </span>
        )}
      </button>
    );
  },
);
