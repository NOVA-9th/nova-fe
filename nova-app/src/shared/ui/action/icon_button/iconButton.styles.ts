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
        class: 'bg-surface text-base-color hover:bg-surface active:bg-surface',
      },
      {
        style: 'outline',
        peak: false,
        class: 'hover:bg-surface text-additive active:bg-surface',
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
        class: 'bg-data-surface text-data-base danger hover:bg-data-surface',
      },
    ],
    defaultVariants: {
      size: 'lg',
      style: 'surface',
      peak: true,
    },
  },
);
