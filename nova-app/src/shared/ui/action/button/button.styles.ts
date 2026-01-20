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
        lg: '  size-lg typo-body-key',
        md: ' size-md typo-callout-key',
        sm: '  size-sm typo-footnote-key',
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
        class: 'bg-peak text-peak hover:bg-peak active:bg-peak',
      },
      {
        style: 'surface',
        peak: false,
        class: 'bg-surface text-additive hover:bg-surface active:bg-surface',
      },
      {
        style: 'outline',
        peak: true,
        class: 'bg-surface hover:bg-surface active:bg-surface text-base-color',
      },
      {
        style: 'outline',
        peak: false,
        class: 'hover:bg-surface active:bg-surface text-additive',
      },
      {
        style: 'accent',
        peak: true,
        class: 'bg-accent-peak text-accent-peak hover:bg-accent-peak active:bg-accent-peak',
      },
      {
        style: 'accent',
        peak: false,
        class:
          'bg-accent-surface text-accent-base hover:bg-accent-surface active:bg-accent-surface',
      },
      {
        style: 'data',
        peak: true,
        class: 'bg-data-peak text-data-peak danger hover:bg-data-peak active:bg-data-peak',
      },
      {
        style: 'data',
        peak: false,
        class: 'bg-data-surface text-data-base danger hover:bg-data-surface active:bg-data-surface',
      },
    ],
    defaultVariants: {
      size: 'lg',
      style: 'surface',
      peak: true,
    },
  },
);
