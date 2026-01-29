import { cn } from '@/shared/utils/cn';
import { VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import React from 'react';
import { ButtonVariants } from '@/shared/ui/styles/button.styles';

interface TextIconButtonProps extends VariantProps<typeof ButtonVariants> {
  onClick?: () => void;
  label: string;
  className?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
}

const TextIconButton = ({
  onClick,
  className,
  label,
  style,
  size,
  peak,
  leftIcon,
  rightIcon,
}: TextIconButtonProps) => {
  return (
    <button onClick={onClick} className={cn(ButtonVariants({ size, style, peak }), className)}>
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
};

export default TextIconButton;
