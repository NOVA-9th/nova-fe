import { cva } from 'class-variance-authority';

export const ContentIconSizeVariants = cva('', {
  variants: {
    size: {
      lg: 'size-4',
      md: 'size-3.5',
      sm: 'size-3',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});
