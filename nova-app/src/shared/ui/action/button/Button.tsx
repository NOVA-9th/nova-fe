import { cn } from '@/shared/utils/cn';
import { ButtonVariants } from '@/shared/ui/action/button/button.styles';
import { VariantProps } from 'class-variance-authority';

interface ButtonProps extends VariantProps<typeof ButtonVariants> {
  onClick?: () => void;
  label: string;
  className?: string;
}

export const Button = ({ onClick, className, label = '버튼', peak, style, size }: ButtonProps) => {
  return (
    <button onClick={onClick} className={cn(ButtonVariants({ size, peak, style }), className)}>
      {label}
    </button>
  );
};
