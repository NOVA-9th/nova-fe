import { cn } from '@/shared/lib/cn';
import { ButtonVariants } from '@/shared/ui/action/button/button.styles';
import { VariantProps } from 'class-variance-authority';

interface ButtonProps extends VariantProps<typeof ButtonVariants> {
  onClick: () => void;
  label: string;
  className: string;
}

export const Button = ({ onClick, className, label = '버튼', size, peek }: ButtonProps) => {
  return <div className={cn(ButtonVariants({ size, peek }), className)}>{label}</div>;
};
