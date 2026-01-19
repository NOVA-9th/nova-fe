import { IconButtonVariants } from '@/shared/ui/action/icon_button/iconButton.styles';
import { cn } from '@/shared/utils/cn';
import { VariantProps } from 'class-variance-authority';
interface IconButtonProps extends VariantProps<typeof IconButtonVariants> {
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export const IconBtn = ({ onClick, size, style, className, peak, icon }: IconButtonProps) => {
  return (
    <button onClick={onClick} className={cn(IconButtonVariants({ size, style, peak }), className)}>
      {icon}
    </button>
  );
};
