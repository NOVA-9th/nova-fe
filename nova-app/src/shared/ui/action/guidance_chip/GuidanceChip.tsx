import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';

const GuidanceChipVariants = cva(
  'flex items-center justify-center rounded-interactive-default px-padding-regular py-padding-light',
  {
    variants: {
      size: {
        md: 'gap-1.5 size-md typo-callout-base',
        sm: 'gap-1 size-sm typo-footnote-base',
      },

      variant: {
        surface: 'text-additive bg-surface hover:bg-surface',
        outline: 'text-additive border-ring border hover:bg-surface',
        accent: 'text-accent-base bg-accent-surface hover:bg-accent-surface',
      },
    },
  },
);

interface GuidanceChipProps extends VariantProps<typeof GuidanceChipVariants> {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const GuidanceChip = ({ size, variant, text, icon, onClick, className }: GuidanceChipProps) => {
  return (
    <button
      type='button'
      className={cn(GuidanceChipVariants({ size, variant }), className)}
      onClick={onClick}
    >
      {icon}
      <p>{text}</p>
    </button>
  );
};

export default GuidanceChip;
