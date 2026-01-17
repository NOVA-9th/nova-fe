import { cn } from '@/shared/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const sideItemVariants = cva(
  'flex items-center rounded-interactive-default size-lg px-padding-bold py-padding-regular',
  {
    variants: {
      peak: {
        true: '',
        false: '',
      },
      minimized: {
        true: '',
        false: '',
      },
    },

    compoundVariants: [
      {
        peak: false,
        minimized: false,
        class: 'w-60 h-11 typo-body-key text-optional gap-2.5',
      },
      {
        peak: true,
        minimized: false,
        class: 'w-60 h-11 bg-surface typo-body-key text-base-color gap-2.5',
      },
      {
        peak: false,
        minimized: true,
        class: 'w-17 h-17.5 typo-callout-key text-optional flex-col justify-center gap-1.5',
      },
      {
        peak: true,
        minimized: true,
        class:
          'w-17 h-17.5 bg-surface typo-callout-key text-base-color flex-col justify-center gap-1.5',
      },
    ],

    defaultVariants: {
      peak: false,
      minimized: false,
    },
  },
);

type SideTabItemProps = VariantProps<typeof sideItemVariants> & {
  icon?: React.ReactNode;
  label?: string;
  className?: string;
};

const SideTabItem = ({ peak, minimized, className, icon, label }: SideTabItemProps) => {
  return (
    <div className={cn(sideItemVariants({ peak, minimized }), className)}>
      {icon}
      {label}
    </div>
  );
};

export default SideTabItem;
