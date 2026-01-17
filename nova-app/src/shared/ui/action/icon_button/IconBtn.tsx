import { IconButtonVariants } from '@/shared/ui/action/icon_button/iconButton.styles';
import { ContentIcon } from '@/shared/ui/icon/Content';
import { cn } from '@/shared/utils/cn';
import { VariantProps } from 'class-variance-authority';

interface IconButtonProps extends VariantProps<typeof IconButtonVariants> {
  onClick?: () => void;
  className?: string;
}

export const IconBtn = ({ onClick, size, style, className, peak }: IconButtonProps) => {
  return (
    <button onClick={onClick} className={cn(IconButtonVariants({ size, style, peak }), className)}>
      <ContentIcon style={style} peak={peak} size={size} />
    </button>
  );
};
