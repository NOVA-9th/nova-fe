import { TextBtnVariants } from '@/shared/ui/styles/textButton.styles';
import { cn } from '@/shared/utils/cn';
import { VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface TextButtonProps extends VariantProps<typeof TextBtnVariants> {
  onClick?: () => void;
  label: string;
  className?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

export const TextButton = ({
  label,
  onClick,
  className,
  size,
  style,
  leftIcon,
  rightIcon,
}: TextButtonProps) => {
  return (
    <button onClick={onClick} className={cn(TextBtnVariants({ size, style }), className)}>
      {leftIcon && (
        <span>
          {React.createElement(leftIcon, {
            size: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
          })}
        </span>
      )}
      {label}
      {rightIcon && (
        <span>
          {React.createElement(rightIcon, {
            size: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
          })}
        </span>
      )}
    </button>
  );
};
