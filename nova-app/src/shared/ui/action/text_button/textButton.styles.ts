import { cva } from 'class-variance-authority';

export const TextBtnVariants = cva(`flex items-center`, {
  variants: {
    size: {
      lg: 'typo-body-key gap-2',
      md: 'typo-callout-key gap-1.5',
      sm: 'typo-footnote-key gap-1.5',
    },
    style: {
      surface: 'text-additive',
      accent: 'text-accent-base',
      data: 'danger text-data-base',
    },
  },
  defaultVariants: {
    size: 'lg',
    style: 'surface',
  },
});
