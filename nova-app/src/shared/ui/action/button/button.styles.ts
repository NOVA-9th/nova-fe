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
        lg: 'w-18  size-lg ',
        md: 'w-15.5 size-md ',
        sm: 'w-13  size-sm',
      },
      style: {
        surface: 'bg-peek',
        outline: 'bg-blue-600',
        Accent: 'bg-blue-700',
        data: 'bg-sub-500',
      },
      peek: {
        // true: 'text-white',
        // false: 'text-black',
      },
    },
    defaultVariants: {
      //   size: 'default',
      //   color: 'default',
      //   textColor: 'default',
    },
  },
);
