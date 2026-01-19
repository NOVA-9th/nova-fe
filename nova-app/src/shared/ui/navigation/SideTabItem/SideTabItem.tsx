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
        class: 'typo-body-key text-optional gap-3', // gap 2.5 + label 패팅 px 0.5
      },
      {
        peak: true,
        minimized: false,
        class: 'bg-surface typo-body-key text-base-color gap-3',
      },
      {
        peak: false,
        minimized: true,
        class: 'typo-callout-key text-optional flex-col justify-center gap-2',
      },
      {
        peak: true,
        minimized: true,
        class: 'bg-surface typo-callout-key text-base-color flex-col justify-center gap-2',
      },
    ],

    defaultVariants: {
      peak: false,
      minimized: false,
    },
  },
);

interface SideTabItemProps extends VariantProps<typeof sideItemVariants> {
  icon?: React.ReactNode;
  label: string;
  className?: string;
}

const SideTabItem = ({ peak, minimized, className, icon, label }: SideTabItemProps) => {
  return (
    <div className={cn(sideItemVariants({ peak, minimized }), className)}>
      {icon}
      {label}
    </div>
  );
};

export default SideTabItem;
