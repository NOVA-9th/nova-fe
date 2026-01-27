import { cn } from '@/shared/utils/cn';
import { ButtonVariants } from '@/shared/ui/styles/button.styles';
import { VariantProps } from 'class-variance-authority';

interface ButtonProps extends VariantProps<typeof ButtonVariants> {
  onClick?: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
}

const Button = ({ onClick, className, label, peak, style, size, disabled }: ButtonProps) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        ButtonVariants({ size, peak: disabled ? false : peak, style }),
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      {label}
    </button>
  );
};

export default Button;
