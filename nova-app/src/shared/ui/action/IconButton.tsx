import { IconButtonVariants } from '@/shared/ui/styles/iconButton.styles';
import { cn } from '@/shared/utils/cn';
import { VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface IconButtonProps extends VariantProps<typeof IconButtonVariants> {
  onClick?: () => void;
  className?: string;
  icon: LucideIcon;
}

export const IconButton = ({ onClick, size, style, className, peak, icon }: IconButtonProps) => {
  return (
    <button onClick={onClick} className={cn(IconButtonVariants({ size, style, peak }), className)}>
      <span>
        {React.createElement(icon, {
          size: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
        })}
      </span>
    </button>
  );
};
