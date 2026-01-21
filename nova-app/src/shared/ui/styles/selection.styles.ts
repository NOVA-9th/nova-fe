import { cva } from 'class-variance-authority';

export const SelectionChipVariants = cva(
  `
  inline-flex items-center justify-center
  py-padding-light px-padding-regular
  rounded-interactive-default
  `,
  {
    variants: {
      size: {
        md: ' size-md typo-callout-key gap-2',
        sm: '  size-sm typo-footnote-base gap-1.5',
      },
      style: {
        surface: '',
        outline: 'border',
        accent: '',
      },
      selected: {
        true: '',
        false: '',
      },
    },

    compoundVariants: [
      {
        style: 'surface',
        selected: true,
        class: 'bg-peak text-peak hover:bg-peak active:bg-peak',
      },
      {
        style: 'surface',
        selected: false,
        class: 'bg-surface text-optional hover:bg-surface active:bg-surface',
      },
      {
        style: 'outline',
        selected: true,
        class: 'bg-surface hover:bg-surface active:bg-surface text-base  border-selected',
      },
      {
        style: 'outline',
        selected: false,
        class: 'hover:bg-surface active:bg-surface text-optional border-outline',
      },
      {
        style: 'accent',
        selected: true,
        class: 'bg-accent-peak text-accent-peak hover:bg-accent-peak active:bg-accent-peak',
      },
      {
        style: 'accent',
        selected: false,
        class:
          'bg-accent-surface text-accent-base hover:bg-accent-surface active:bg-accent-surface',
      },
    ],
    defaultVariants: {
      size: 'md',
      style: 'surface',
      selected: true,
    },
  },
);
