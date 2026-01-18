import { cva } from 'class-variance-authority';

export const TextBtnIconVariants = cva('', {
  variants: {
    size: {
      lg: 'size-4',
      md: 'size-3.5',
      sm: 'size-3',
    },
    style: {
      surface: '#151618',
      accent: '#287AF5',
      data: '#F04C5A',
    },
  },

  defaultVariants: {
    size: 'lg',
    style: 'surface',
  },
});
