import { cva } from 'class-variance-authority';

export const IconButtonVariants = cva(
  `
  inline-flex items-center justify-center 
  p-padding-regular
  rounded-interactive-default
  `,
  {
    variants: {
      size: {
        lg: '  size-lg size-11',
        md: ' size-md size-9',
        sm: '  size-sm size-7',
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
        class: 'bg-peak  hover:hovered hover:bg-peak active:active active:bg-peak',
      },
      {
        style: 'surface',
        peak: false,
        class: 'bg-surface  hover:hovered hover:bg-surface active:active active:bg-surface',
      },
      {
        style: 'outline',
        peak: true,
        class: 'bg-surface ',
      },
      {
        style: 'outline',
        peak: false,
        class: 'bg-surface hover:hovered hover:bg-surface active:active active:bg-surface',
      },
      {
        style: 'outline',
        peak: true,
        class: 'bg-surface ',
      },
      {
        style: 'accent',
        peak: true,
        class:
          'bg-accent-peak hover:hovered hover:bg-accent-peak active:active active:bg-accent-peak',
      },
      {
        style: 'accent',
        peak: false,
        class:
          'bg-accent-surface hover:hovered hover:bg-accent-surface active:active active:bg-accent-surface',
      },
      {
        style: 'data',
        peak: true,
        class:
          'bg-data-peak  danger hover:hovered hover:bg-data-peak active:active active:bg-data-peak',
      },
      {
        style: 'data',
        peak: false,
        class: 'bg-data-surface danger hover:hovered hover:bg-data-surface',
      },
    ],
    defaultVariants: {
      size: 'lg',
      style: 'surface',
      peak: true,
    },
  },
);
