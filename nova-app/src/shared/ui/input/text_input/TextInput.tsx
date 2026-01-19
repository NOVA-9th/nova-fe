import { cn } from '@/shared/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const TextInputVariants = cva(
  'flex items-center rounded-interactive-default px-padding-medium py-padding-regular',
  {
    variants: {
      size: {
        md: 'gap-2.5 size-md typo-callout-base',
        lg: 'gap-3 size-lg typo-body-base',
      },

      variant: {
        surface: '',
        outline: '',
      },

      data: {
        true: '',
        false: 'border-outline focus-within:border-selected hover:border-ring',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        data: true,
        class: 'border border-data-outline focus-within:border-data-selected danger',
      },
      {
        variant: 'surface',
        data: true,
        class: 'bg-data-surface danger',
      },
      {
        variant: 'surface',
        data: false,
        class: 'bg-slate-surface',
      },
      {
        variant: 'outline',
        data: false,
        class: 'border hover:bg-surface',
      },
    ],
  },
);

interface TextInputProps extends VariantProps<typeof TextInputVariants> {
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function TextInput({
  size,
  variant,
  data,
  placeholder,
  icon,
  className,
}: TextInputProps) {
  return (
    <div className={cn(TextInputVariants({ size, variant, data }), className)}>
      <span className='text-charcoal-additive'>{icon}</span>
      <input
        type='text'
        className='placeholder:text-charcoal-optional flex-1 bg-transparent outline-none'
        placeholder={placeholder}
      />
      <X size={size === 'md' ? 14 : 16} className='text-charcoal-optional' />
    </div>
  );
}
