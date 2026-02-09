import { SelectionChipVariants } from '@/shared/ui/styles/selection.styles';
import { cn } from '@/shared/utils/cn';
import { VariantProps } from 'class-variance-authority';
import { ChevronDown, LucideIcon } from 'lucide-react';
import React, { memo, useCallback } from 'react';

interface SelectionChipProps extends VariantProps<typeof SelectionChipVariants> {
  index?: number;
  onClick?: (index: number) => void;
  label: string;
  className?: string;
  icon?: LucideIcon;
  isShowChevron: boolean;
}

const ICON_SIZE_BY_CHIP_SIZE = {
  sm: 12,
  md: 14,
} as const;

export const SelectionChip = memo(
  ({
    size,
    style,
    selected,
    className,
    label,
    onClick,
    icon,
    isShowChevron,
    index,
  }: SelectionChipProps) => {
    const handleClick = useCallback(() => {
      onClick?.(index!);
    }, [onClick, index]);

    return (
      <button
        type='button'
        className={cn(SelectionChipVariants({ size, style, selected }), className)}
        onClick={handleClick}
      >
        {icon && (
          <span>
            {React.createElement(icon, {
              size: size === 'sm' ? 12 : 14,
            })}
          </span>
        )}
        {label}
        {isShowChevron && <ChevronDown size={ICON_SIZE_BY_CHIP_SIZE[size ?? 'md']} />}
      </button>
    );
  },
);
