import { cn } from '@/shared/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';
import { TextBtn } from '../../action/text_button/TextBtn';

const breadcrumbVariants = cva('typo-body-key', {
  variants: {
    textColor: {
      prev: 'text-additive',
      current: 'text-base-color',
    },
  },
  defaultVariants: {
    textColor: 'prev',
  },
});

interface BreadcrumbProps extends VariantProps<typeof breadcrumbVariants> {
  items: string[]; // ['Depth 1', 'Depth 2', ...]
  depth?: 1 | 2 | 3 | 4; // 보여줄 개수(옵션)
  className?: string;
}

const Breadcrumb = ({ items, depth, className }: BreadcrumbProps) => {
  const visible = depth ? items.slice(0, depth) : items;
  const lastIndex = visible.length - 1;

  return (
    <nav className={cn('flex items-center', className)} aria-label='Breadcrumb'>
      {visible.map((label, idx) => {
        const textColor = idx === lastIndex ? 'current' : 'prev';

        return (
          <span key={`${label}-${idx}`} className='flex items-center'>
            <TextBtn label={label} className={breadcrumbVariants({ textColor })} />

            {idx !== lastIndex && (
              <ChevronRight size={16} className='font-100 text-inactive mx-2' />
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
