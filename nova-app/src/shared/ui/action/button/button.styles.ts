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
        class: 'bg-peak text-peak hover:hovered hover:bg-peak active:active active:bg-peak',
      },
      {
        style: 'surface',
        peak: false,
        class:
          'bg-surface text-additive hover:hovered hover:bg-surface active:active active:bg-surface',
      },
      {
        style: 'accent',
        peak: true,
        class:
          'bg-accent-peak text-accent-peak hover:hovered hover:bg-accent-peak active:active active:bg-accent-peak',
      },
      {
        style: 'accent',
        peak: false,
        class:
          'bg-accent-surface text-accent-base hover:hovered hover:bg-accent-surface active:active active:bg-accent-surface',
      },
      {
        style: 'data',
        peak: true,
        class:
          'bg-data-peak text-data-peak danger hover:hovered hover:bg-data-peak active:active active:bg-data-peak',
      },
      {
        style: 'data',
        peak: false,
        class: 'bg-data-surface text-data-base danger hover:hovered hover:bg-data-surface',
      },
    ],
    defaultVariants: {
      size: 'lg',
      style: 'surface',
      peak: true,
    },
  },
);
