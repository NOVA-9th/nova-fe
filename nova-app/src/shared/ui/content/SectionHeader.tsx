import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';
import { memo, useMemo } from 'react';
import type { LucideIcon } from 'lucide-react';

const SectionHeaderVariants = cva('flex items-center py-0.5', {
  variants: {
    size: {
      sm: 'gap-1.5 typo-body-key',
      md: 'gap-1.5 typo-subhead-key',
      lg: 'gap-2 typo-headline-key',
    },
    peak: {
      true: 'text-base',
      false: 'text-additive',
    },
  },
  defaultVariants: {
    size: 'md',
    peak: false,
  },
});

interface SectionHeaderProps extends VariantProps<typeof SectionHeaderVariants> {
  text: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  className?: string;
}

const getLeftIconSize = (size: SectionHeaderProps['size']) =>
  size === 'sm' ? 16 : size === 'md' ? 18 : 20;

const getRightIconSize = (size: SectionHeaderProps['size']) =>
  size === 'sm' ? 14 : size === 'md' ? 16 : 18;

export const SectionHeader = memo(function SectionHeader({
  size = 'md',
  peak = false,
  text,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className,
}: SectionHeaderProps) {
  const leftSize = useMemo(() => getLeftIconSize(size), [size]);
  const rightSize = useMemo(() => getRightIconSize(size), [size]);

  return (
    <div className={cn(SectionHeaderVariants({ size, peak }), className)}>
      {LeftIcon ? (
        <span aria-hidden='true'>
          <LeftIcon size={leftSize} />
        </span>
      ) : null}

      {text}

      {RightIcon ? (
        <span aria-hidden='true'>
          <RightIcon size={rightSize} />
        </span>
      ) : null}
    </div>
  );
});
