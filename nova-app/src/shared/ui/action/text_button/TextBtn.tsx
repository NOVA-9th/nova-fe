import { TextBtnIconVariants } from '@/shared/ui/action/text_button/textBtn.icon.styles';
import {} from '@/shared/ui/action/text_button/textButton.styles';
import { TextBtnVariants } from '@/shared/ui/action/text_button/textButton.styles';
import { ResourceIcon } from '@/shared/ui/icon/Resource';
import { cn } from '@/shared/utils/cn';
import { VariantProps } from 'class-variance-authority';

interface ButtonProps extends VariantProps<typeof TextBtnVariants> {
  onClick?: () => void;
  label: string;
  className?: string;
}

export const TextBtn = ({ label, onClick, className, size, style }: ButtonProps) => {
  return (
    <button onClick={onClick} className={cn(TextBtnVariants({ size, style }), className)}>
      <ResourceIcon className={TextBtnIconVariants({ size, style })} />
      {label}
      <ResourceIcon className={TextBtnIconVariants({ size, style })} />
    </button>
  );
};
