import { SelectionChipVariants } from '@/shared/ui/action/selection_chip/selection.styles';
import { cn } from '@/shared/utils/cn';
import { VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

interface SelectionChipBtnProps extends VariantProps<typeof SelectionChipVariants> {
  onClick?: () => void;
  label: string;
  className?: string;
  icon?: React.ReactNode;
}
const ICON_SIZE_BY_CHIP_SIZE = {
  sm: 12,
  md: 14,
} as const;
export const SelectionChipBtn = ({
  size,
  style,
  selected,
  className,
  label,
  onClick,
  icon,
}: SelectionChipBtnProps) => {
  return (
    <button
      type='button'
      className={cn(SelectionChipVariants({ size, style, selected }), className)}
      onClick={onClick}
    >
      {icon}
      {label}
      <ChevronDown size={ICON_SIZE_BY_CHIP_SIZE[size ?? 'md']} />
    </button>
  );
};
