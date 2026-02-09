import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';
import { memo, useMemo } from 'react';

const HeaderVariants = cva('flex flex-col items-start justify-center', {
  variants: {
    size: {
      md: 'gap-1 py-1 px-1',
      lg: 'gap-1.5 py-1.5 px-1',
    },
  },
});

interface HeaderProps extends VariantProps<typeof HeaderVariants> {
  size: 'md' | 'lg';
  label?: string;
  subLabel?: string;
  description?: string;
  className?: string;
}

export const Header = memo(({ size, subLabel, label, description, className }: HeaderProps) => {
  const containerClass = useMemo(() => cn(HeaderVariants({ size }), className), [size, className]);
  const labelClass = useMemo(
    () => `${size === 'md' ? 'typo-headline-strong' : 'typo-title-strong'} text-base-color`,
    [size],
  );

  return (
    <div className={containerClass}>
      {subLabel && <span className='typo-callout-base text-optional'>{subLabel}</span>}
      {label && <span className={labelClass}>{label}</span>}
      {description && <span className='typo-body-base text-additive'>{description}</span>}
    </div>
  );
});
