import { cva } from 'class-variance-authority';

export const TextBtnVariants = cva(
  `
    flex items-center
    `,
  {
    variants: {
      size: {
        lg: 'typo-body-key gap-[6px]',
        md: 'typo-callout-key gap-1',
        sm: 'typo-footnote-key gap-0.5',
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
  },
);
