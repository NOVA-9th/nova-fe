import { cva } from 'class-variance-authority';

export const ButtonVariants = cva(
  `
  inline-flex items-center justify-center
  py-padding-regular px-padding-bold
  rounded-interactive-default
  `,
  {
    variants: {
      size: {
        lg: 'w-18  size-lg typo-body-key',
        md: 'w-15.5 size-md typo-callout-key',
        sm: 'w-13  size-sm typo-footnote-key',
      },
      style: {
        surface: '',
        outline: 'border border-outline',
        accent: '',
        data: '',
      },
      peak: {
        true: '',
        false: '',
      },
    },

    compoundVariants: [
      {
        style: 'surface',
        peak: true,
        class: 'bg-peak text-peak',
      },
      {
        style: 'surface',
        peak: false,
        class: 'bg-surface text-additive hover:hovered hover:bg-overlay-surface',
      },
      {
        style: 'outline',
        peak: true,
        class: 'bg-surface text-base',
      },
      {
        style: 'outline',
        peak: true,
        class: 'bg-surface text-additive',
      },
      {
        style: 'accent',
        peak: true,
        class: 'bg-accent-peak text-accent-peak',
      },
      {
        style: 'accent',
        peak: false,
        class: 'bg-accent-surface  text-accent-base',
      },
      {
        style: 'data',
        peak: true,
        class: 'bg-data-peak text-data-peak danger',
      },
      {
        style: 'data',
        peak: false,
        class: 'bg-data-surface text-data-base danger',
      },
    ],
    defaultVariants: {
      size: 'lg',
      style: 'outline',
      peak: true,
    },
  },
);
