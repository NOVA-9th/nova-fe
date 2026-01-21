import { TextBtnVariants } from '@/shared/ui/styles/textButton.styles';
import { cn } from '@/shared/utils/cn';
import { VariantProps } from 'class-variance-authority';

interface ButtonProps extends VariantProps<typeof TextBtnVariants> {
  onClick?: () => void;
  label: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const TextButton = ({
  label,
  onClick,
  className,
  size,
  style,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={cn(TextBtnVariants({ size, style }), className)}>
      {leftIcon}
      {label}
      {rightIcon}
    </button>
  );
};

export default TextButton;
