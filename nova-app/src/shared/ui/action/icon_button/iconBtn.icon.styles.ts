// contentIcon.variants.ts
import { cva } from 'class-variance-authority';

export const ContentIconVariants = cva('', {
  variants: {
    style: {
      surface: '',
      outline: '',
      accent: '',
      data: '',
    },
    peak: {
      true: '',
      false: '',
    },
  },

  compoundVariants: [
    { style: 'surface', peak: true, class: 'surface-true' },
    { style: 'surface', peak: false, class: 'surface-false' },

    { style: 'outline', peak: true, class: 'outline-true' },
    { style: 'outline', peak: true, class: 'outline-false' },

    { style: 'accent', peak: true, class: 'accent-true' },
    { style: 'accent', peak: false, class: 'accent-false' },

    { style: 'data', peak: true, class: 'data-true' },
    { style: 'data', peak: false, class: 'data-false' },
  ],

  defaultVariants: {
    style: 'surface',
    peak: true,
  },
});
